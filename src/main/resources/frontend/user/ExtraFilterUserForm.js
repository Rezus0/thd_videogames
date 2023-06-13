import React, { useEffect, useState } from 'react';

const ExtraFilterUserForm = ({ onFilter, onCancel, params }) => {
    const [levelEnabled, setLevelEnabled] = useState(false);
    const [playtimeEnabled, setPlaytimeEnabled] = useState(false);
    const [storeTitleEnabled, setStoreTitleEnabled] = useState(false);
    const [priceEnabled, setPriceEnabled] = useState(false);
    const [genreEnabled, setGenreEnabled] = useState(false);

    const [level, setLevel] = useState(null);
    const [playtime, setPlaytime] = useState(null);
    const [storeTitle, setStoreTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        if (params.gameDataLevel) {
            setLevelEnabled(true);
            setLevel(params.gameDataLevel);
        }
        if (params.gameDataPlaytime) {
            setPlaytimeEnabled(true);
            setPlaytime(params.gameDataPlaytime);
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
            gameDataLevel: levelEnabled ? level : null,
            gameDataPlaytime: playtimeEnabled ? playtime : null,
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
                        className={`filter-option-button extra ${levelEnabled ? 'active' : ''}`}
                        onClick={() => setLevelEnabled(!levelEnabled)}
                    >
                        Level (Game Data)
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
                        className={`filter-option-button extra ${playtimeEnabled ? 'active' : ''}`}
                        onClick={() => setPlaytimeEnabled(!playtimeEnabled)}
                    >
                        Playtime (HRS) (Game Data)
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

export default ExtraFilterUserForm;
