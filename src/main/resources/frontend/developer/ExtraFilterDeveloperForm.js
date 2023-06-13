import React, { useEffect, useState } from 'react';

const ExtraFilterDeveloperForm = ({ onFilter, onCancel, params }) => {
    const [scoreEnabled, setScoreEnabled] = useState(false);
    const [ramEnabled, setRamEnabled] = useState(false);
    const [storeTitleEnabled, setStoreTitleEnabled] = useState(false);
    const [priceEnabled, setPriceEnabled] = useState(false);
    const [genreEnabled, setGenreEnabled] = useState(false);

    const [score, setScore] = useState(null);
    const [ram, setRam] = useState(null);
    const [storeTitle, setStoreTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        if (params.score) {
            setScoreEnabled(true);
            setScore(params.score);
        }
        if (params.ram) {
            setRamEnabled(true);
            setRam(params.ram);
        }
        if (params.storeTitle) {
            setStoreTitleEnabled(true);
            setStoreTitle(params.storeTitle);
        }
        if (params.price) {
            setPriceEnabled(true);
            setPrice(params.price);
        }
        if (params.genre) {
            setGenreEnabled(true);
            setGenre(params.genre);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            ...params,
            score: scoreEnabled ? score : null,
            ram: ramEnabled ? ram : null,
            storeTitle: storeTitleEnabled ? storeTitle : null,
            price: priceEnabled ? price : null,
            genre: genreEnabled ? genre : null
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
            <form onSubmit={handleFilter}>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button extra ${scoreEnabled ? 'active' : ''}`}
                        onClick={() => setScoreEnabled(!scoreEnabled)}
                    >
                        Score (Game)
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
                        className={`filter-option-button extra ${ramEnabled ? 'active' : ''}`}
                        onClick={() => setRamEnabled(!ramEnabled)}
                    >
                        RAM (Rec Req)
                    </button>
                    {ramEnabled && (
                        <input
                            type="number"
                            value={ram}
                            onChange={(e) => setRam(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button extra ${storeTitleEnabled ? 'active' : ''}`}
                        onClick={() => setStoreTitleEnabled(!storeTitleEnabled)}
                    >
                        Title (Stores)
                    </button>
                    {storeTitleEnabled && (
                        <input
                            type="text"
                            value={storeTitle}
                            onChange={(e) => setStoreTitle(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button extra ${priceEnabled ? 'active' : ''}`}
                        onClick={() => setPriceEnabled(!priceEnabled)}
                    >
                        Price ($) (Sold Games)
                    </button>
                    {priceEnabled && (
                        <input
                            type="number"
                            value={price}
                            step="0.01"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button extra ${genreEnabled ? 'active' : ''}`}
                        onClick={() => setGenreEnabled(!genreEnabled)}
                    >
                        Genre (Games)
                    </button>
                    {genreEnabled && (
                        <input
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
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

export default ExtraFilterDeveloperForm;
