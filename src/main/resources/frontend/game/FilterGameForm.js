import React, {useEffect, useState} from 'react';

const FilterGameForm = ({ onFilter, onCancel, params }) => {
    const [titleEnabled, setTitleEnabled] = useState(false);
    const [genreEnabled, setGenreEnabled] = useState(false);
    const [scoreEnabled, setScoreEnabled] = useState(false);
    const [minReqIdEnabled, setMinReqIdEnabled] = useState(false);
    const [recReqIdEnabled, setRecReqIdEnabled] = useState(false);

    const [gameTitle, setGameTitle] = useState(null);
    const [genre, setGenre] = useState(null);
    const [score, setScore] = useState(null);
    const [minReqId, setMinReqId] = useState(null);
    const [recReqId, setRecReqId] = useState(null);

    useEffect(() => {
        if (params.gameTitle) {
            setTitleEnabled(true);
            setGameTitle(params.gameTitle);
        }
        if (params.genre) {
            setGenreEnabled(true);
            setGenre(params.genre);
        }
        if (params.score) {
            setScoreEnabled(true);
            setScore(params.score);
        }
        if (params.minReqId) {
            setMinReqIdEnabled(true);
            setMinReqId(params.minReqId);
        }
        if (params.recReqId) {
            setRecReqIdEnabled(true);
            setRecReqId(params.recReqId);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            gameTitle: titleEnabled ? gameTitle : null,
            genre: genreEnabled ? genre : null,
            score: scoreEnabled ? score : null,
            minReqId: minReqIdEnabled ? minReqId : null,
            recReqId: recReqIdEnabled ? recReqId : null,
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
        <form onSubmit={handleFilter}>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${titleEnabled ? 'active' : ''}`}
                    onClick={() => setTitleEnabled(!titleEnabled)}
                >
                    Title
                </button>
                {titleEnabled && (
                    <input
                        type="text"
                        value={gameTitle}
                        onChange={(e) => setGameTitle(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${genreEnabled ? 'active' : ''}`}
                    onClick={() => setGenreEnabled(!genreEnabled)}
                >
                    Genre
                </button>
                {genreEnabled && (
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${scoreEnabled ? 'active' : ''}`}
                    onClick={() => setScoreEnabled(!scoreEnabled)}
                >
                    Score
                </button>
                {scoreEnabled && (
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${minReqIdEnabled ? 'active' : ''}`}
                    onClick={() => setMinReqIdEnabled(!minReqIdEnabled)}
                >
                    Minimal Requirement Id
                </button>
                {minReqIdEnabled && (
                    <input
                        type="number"
                        value={minReqId}
                        onChange={(e) => setMinReqId(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${recReqIdEnabled ? 'active' : ''}`}
                    onClick={() => setRecReqIdEnabled(!recReqIdEnabled)}
                >
                    Recommended Requirement Id
                </button>
                {recReqIdEnabled && (
                    <input
                        type="number"
                        value={recReqId}
                        onChange={(e) => setRecReqId(e.target.value)}
                    />
                )}
            </div>
            <button type="submit">Filter</button>
            <button type="button" className="filter-option-cancel" onClick={onCancel}>Cancel</button>
        </form>
        </div>
    );
};

export default FilterGameForm;
