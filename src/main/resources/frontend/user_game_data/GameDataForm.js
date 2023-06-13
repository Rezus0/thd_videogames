import React, { useState } from 'react';
import axios from 'axios';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GameDataForm = ({ onAdd, onCancel }) => {
    const [user, setUser] = useState('');
    const [game, setGame] = useState('');
    const [level, setLevel] = useState('');
    const [playtime, setPlaytime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const gameData = {
            userId: parseInt(user),
            gameId: parseInt(game),
            level: parseInt(level),
            playtime: parseFloat(playtime),
        };
        try {
            await axios.post('http://localhost:5667/api/v1/game-data/add', gameData);
            onAdd();
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add Game Data <FontAwesomeIcon icon={faNoteSticky} /></h2>
            <form onSubmit={handleSubmit}>
                <label>User ID:</label>
                <input
                    type="number"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <label>Game ID:</label>
                <input
                    type="number"
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                />
                <label>Level:</label>
                <input
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                />
                <label>Playtime (HRS):</label>
                <input
                    type="number"
                    step="0.01"
                    value={playtime}
                    onChange={(e) => setPlaytime(e.target.value)}
                />
                <button type="submit">Add Game Data</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default GameDataForm;
