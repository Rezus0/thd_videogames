import React, { useEffect, useState } from 'react';

const FilterGameDataForm = ({ onFilter, onCancel, params }) => {
    const [userEnabled, setUserEnabled] = useState(false);
    const [gameEnabled, setGameEnabled] = useState(false);
    const [levelEnabled, setLevelEnabled] = useState(false);
    const [playtimeEnabled, setPlaytimeEnabled] = useState(false);

    const [user, setUser] = useState(null);
    const [game, setGame] = useState(null);
    const [level, setLevel] = useState(null);
    const [playtime, setPlaytime] = useState(null);

    useEffect(() => {
        if (params.userId) {
            setUserEnabled(true);
            setUser(params.userId);
        }
        if (params.gameId) {
            setGameEnabled(true);
            setGame(params.gameId);
        }
        if (params.level) {
            setLevelEnabled(true);
            setLevel(params.level);
        }
        if (params.playtime) {
            setPlaytimeEnabled(true);
            setPlaytime(params.playtime);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            userId: userEnabled ? user : null,
            gameId: gameEnabled ? game : null,
            level: levelEnabled ? level : null,
            playtime: playtimeEnabled ? playtime : null,
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
            <form onSubmit={handleFilter}>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${userEnabled ? 'active' : ''}`}
                        onClick={() => setUserEnabled(!userEnabled)}
                    >
                        User
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
                        className={`filter-option-button ${gameEnabled ? 'active' : ''}`}
                        onClick={() => setGameEnabled(!gameEnabled)}
                    >
                        Game
                    </button>
                    {gameEnabled && (
                        <input
                            type="number"
                            value={game}
                            onChange={(e) => setGame(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${levelEnabled ? 'active' : ''}`}
                        onClick={() => setLevelEnabled(!levelEnabled)}
                    >
                        Level
                    </button>
                    {levelEnabled && (
                        <input
                            type="number"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${playtimeEnabled ? 'active' : ''}`}
                        onClick={() => setPlaytimeEnabled(!playtimeEnabled)}
                    >
                        Playtime (HRS)
                    </button>
                    {playtimeEnabled && (
                        <input
                            type="number"
                            value={playtime}
                            step="0.01"
                            onChange={(e) => setPlaytime(e.target.value)}
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

export default FilterGameDataForm;
