import React, { useState, useEffect } from 'react';

const FilterSoldGameForm = ({ onFilter, onCancel, params }) => {
    const [gameEnabled, setGameEnabled] = useState(false);
    const [storeEnabled, setStoreEnabled] = useState(false);
    const [priceEnabled, setPriceEnabled] = useState(false);

    const [game, setGame] = useState(null);
    const [store, setStore] = useState(null);
    const [price, setPrice] = useState(null);

    useEffect(() => {
        if (params.gameId) {
            setGameEnabled(true);
            setGame(params.game);
        }
        if (params.storeId) {
            setStoreEnabled(true);
            setStore(params.store);
        }
        if (params.price) {
            setPriceEnabled(true);
            setPrice(params.price);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            gameId: gameEnabled ? game : null,
            storeId: storeEnabled ? store : null,
            price: priceEnabled ? price : null,
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
                        className={`filter-option-button ${storeEnabled ? 'active' : ''}`}
                        onClick={() => setStoreEnabled(!storeEnabled)}
                    >
                        Store
                    </button>
                    {storeEnabled && (
                        <input
                            type="number"
                            value={store}
                            onChange={(e) => setStore(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${priceEnabled ? 'active' : ''}`}
                        onClick={() => setPriceEnabled(!priceEnabled)}
                    >
                        Price ($)
                    </button>
                    {priceEnabled && (
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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

export default FilterSoldGameForm;
