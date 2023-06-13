import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {faGamepad} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const GameUpdateForm = ({ game, onEdit, onCancel }) => {
    const [gameId, setGameId] = useState('');
    const [devId, setDevId] = useState('');
    const [pubId, setPubId] = useState('');
    const [dateId, setDateId] = useState('');

    useEffect(() => {
        if (game) {
            setGameId(game.game);
            setDevId(game.developer);
            setPubId(game.publisher);
            setDateId(game.date);
        }
    }, [game]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const gameData = {
            game: gameId,
            developer: devId,
            publisher: pubId,
            date: dateId
        };
        try {
            await axios.post(`http://localhost:5667/api/v1/released_games/update/${game.id}`, gameData);
            onEdit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit a Released Game <FontAwesomeIcon icon={faGamepad}/></h2>
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
                    value={devId}
                    onChange={(e) => setPubId(e.target.value)}
                />
                <label>Developer ID:</label>
                <input
                    type="number"
                    value={pubId}
                    onChange={(e) => setDevId(e.target.value)}
                />
                <label>Date ID:</label>
                <input
                    type="number"
                    value={dateId}
                    onChange={(e) => setDateId(e.target.value)}
                />
                <button type="submit">Edit Game</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default GameUpdateForm;
