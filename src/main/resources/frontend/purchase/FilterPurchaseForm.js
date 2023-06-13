import React, { useEffect, useState } from 'react';

const FilterPurchaseForm = ({ onFilter, onCancel, params }) => {
    const [soldGameEnabled, setSoldGameEnabled] = useState(false);
    const [userEnabled, setUserEnabled] = useState(false);
    const [timeEnabled, setTimeEnabled] = useState(false);

    const [soldGame, setSoldGame] = useState(null);
    const [user, setUser] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => {
        if (params.soldGameId) {
            setSoldGameEnabled(true);
            setSoldGame(params.soldGameId);
        }
        if (params.userId) {
            setUserEnabled(true);
            setUser(params.userId);
        }
        if (params.timeId) {
            setTimeEnabled(true);
            setTime(params.timeId);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            soldGameId: soldGameEnabled ? soldGame : null,
            userId: userEnabled ? user : null,
            timeId: timeEnabled ? time : null,
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
            <form onSubmit={handleFilter}>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${soldGameEnabled ? 'active' : ''}`}
                        onClick={() => setSoldGameEnabled(!soldGameEnabled)}
                    >
                        Sold Game ID
                    </button>
                    {soldGameEnabled && (
                        <input
                            type="number"
                            value={soldGame}
                            onChange={(e) => setSoldGame(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${userEnabled ? 'active' : ''}`}
                        onClick={() => setUserEnabled(!userEnabled)}
                    >
                        User ID
                    </button>
                    {userEnabled && (
                        <input
                            type="number"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${timeEnabled ? 'active' : ''}`}
                        onClick={() => setTimeEnabled(!timeEnabled)}
                    >
                        Time ID
                    </button>
                    {timeEnabled && (
                        <input
                            type="number"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    )}
                </div>
                <button type="submit">Filter</button>
                <button type="button" className="filter-option-cancel" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default FilterPurchaseForm;
