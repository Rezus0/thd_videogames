import React, { useState } from 'react';
import axios from 'axios';
import {faGamepad} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ReleasedGameForm = ({onAdd, onCancel}) => {
    const [gameId, setGameId] = useState('');
    const [devId, setDevId] = useState('');
    const [pubId, setPubId] = useState('');
    const [dateId, setDateId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const gameData = {
            gameId: gameId,
            devId: devId,
            pubId: pubId,
            dateId: dateId
        };
        try {
            await axios.post('http://localhost:5667/api/v1/released_games/add', gameData);
            onAdd();
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add a Released Game <FontAwesomeIcon icon={faGamepad}/></h2>
            <form onSubmit={handleSubmit}>
                <label>Game ID:</label>
                <input
                    type="number"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                />
                <label>Publisher ID:</label>
                <input
                    type="number"
                    value={pubId}
                    onChange={(e) => setPubId(e.target.value)}
                />
                <label>Developer ID:</label>
                <input
                    type="number"
                    value={devId}
                    onChange={(e) => setDevId(e.target.value)}
                />
                <label>Date ID:</label>
                <input
                    type="number"
                    value={dateId}
                    onChange={(e) => setDateId(e.target.value)}
                />
                <button type="submit">Add Game</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default ReleasedGameForm;
