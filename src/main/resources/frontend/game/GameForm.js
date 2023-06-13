import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {faGamepad} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const GameForm = ({onAdd, onCancel}) => {
    const [gameTitle, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [score, setScore] = useState('');
    const [minReq, setMinRecId] = useState('');
    const [recReq, setRecReqId] = useState('');

    const [scoreError, setScoreError] = useState(false);

    useEffect(() => {
        if (score === '') {
            setScoreError(false);
            return;
        }
        if (score <= 0 || score > 100 || !Number.isInteger(Number(score))) {
            setScoreError(true);
        } else {
            setScoreError(false);
        }
    }, [score]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (scoreError || gameTitle === '' || genre === '' || score === '' || minReq === '' || recReq === '') {
            return;
        }
        const gameData = {
            gameTitle: gameTitle,
            genre: genre,
            score: parseInt(score),
            minReqId: parseInt(minReq),
            recReqId: parseInt(recReq)
        };
        try {
            await axios.post('http://localhost:5667/api/v1/games/add', gameData);
            onAdd();
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add a Game <FontAwesomeIcon icon={faGamepad}/></h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={gameTitle}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Genre:</label>
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <label>Score:</label>
                <input
                    type="number"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className={scoreError ? 'error' : ''}
                />
                {scoreError &&
                    <b className="error-message">
                        Score must be an integer between 1 and 100.
                    </b>
                }
                <label>Minimal Requirement ID:</label>
                <input
                    type="number"
                    value={minReq}
                    onChange={(e) => setMinRecId(e.target.value)}
                />
                <label>Recommended Requirement ID:</label>
                <input
                    type="number"
                    value={recReq}
                    onChange={(e) => setRecReqId(e.target.value)}
                />
                <button type="submit">Add Game</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default GameForm;
