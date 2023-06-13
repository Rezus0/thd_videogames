
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";

const SoldGameUpdateForm = ({ soldGame, onEdit, onCancel }) => {
    const [game, setGame] = useState('');
    const [store, setStore] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (soldGame) {
            setGame(soldGame.game);
            setStore(soldGame.store);
            setPrice(soldGame.price);
        }
    }, [soldGame]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const soldGameData = {
            gameId: game,
            storeId: store,
            price: parseFloat(price),
        };
        try {
            await axios.post(`http://localhost:5667/api/v1/sold_games/update/${soldGame.id}`, soldGameData);
            onEdit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit a Sold Game <FontAwesomeIcon icon={faCoins} /></h2>
            <form onSubmit={handleSubmit}>
                <label>Game ID:</label>
                <input
                    type="number"
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                />
                <label>Store ID:</label>
                <input
                    type="number"
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                />
                <label>Price ($):</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button type="submit">Edit Sold Game</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default SoldGameUpdateForm;

