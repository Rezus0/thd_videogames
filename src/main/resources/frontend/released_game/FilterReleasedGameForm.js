import React, {useEffect, useState} from 'react';

const FilterReleasedGameForm = ({ onFilter, onCancel, params }) => {
    const [gameEnabled, setGameEnabled] = useState(false);
    const [pubEnabled, setPubEnabled] = useState(false);
    const [devEnabled, setDevEnabled] = useState(false);
    const [dateEnabled, setDateEnabled] = useState(false);

    const [gameId, setGameId] = useState(null);
    const [pubId, setPubId] = useState(null);
    const [devId, setDevId] = useState(null);
    const [dateId, setDateId] = useState(null);

    useEffect(() => {
        if (params.gameId) {
            setGameEnabled(true);
            setGameId(params.gameId);
        }
        if (params.pubId) {
            setPubEnabled(true);
            setPubId(params.pubId);
        }
        if (params.devId) {
            setDevEnabled(true);
            setDevId(params.devId);
        }
        if (params.dateId) {
            setDateEnabled(true);
            setDateId(params.dateId);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            gameId: gameEnabled ? gameId : null,
            pubId: pubEnabled ? pubId : null,
            devId: devEnabled ? devId : null,
            dateId: dateEnabled ? dateId : null,
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
        <form onSubmit={handleFilter}>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${gameEnabled ? 'active' : ''}`}
                    onClick={() => setGameEnabled(!gameEnabled)}
                >
                    Game ID
                </button>
                {gameEnabled && (
                    <input
                        type="text"
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${pubEnabled ? 'active' : ''}`}
                    onClick={() => setPubEnabled(!pubEnabled)}
                >
                    Publisher ID
                </button>
                {pubEnabled && (
                    <input
                        type="text"
                        value={pubId}
                        onChange={(e) => setPubId(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${devEnabled ? 'active' : ''}`}
                    onClick={() => setDevEnabled(!devEnabled)}
                >
                    Developer ID
                </button>
                {devEnabled && (
                    <input
                        type="number"
                        value={devId}
                        onChange={(e) => setDevId(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${dateEnabled ? 'active' : ''}`}
                    onClick={() => setDateEnabled(!dateEnabled)}
                >
                    Date ID
                </button>
                {dateEnabled && (
                    <input
                        type="number"
                        value={dateId}
                        onChange={(e) => setDateId(e.target.value)}
                    />
                )}
            </div>
            <button type="submit">Filter</button>
            <button type="button" className="filter-option-cancel" onClick={onCancel}>Cancel</button>
        </form>
        </div>
    );
};

export default FilterReleasedGameForm;
