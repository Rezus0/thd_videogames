import React, { useState } from 'react';
import axios from 'axios';
import {faClock, faGamepad} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TimeForm = ({onAdd, onCancel}) => {
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [date, setDateId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const gameData = {
            hour: parseInt(hour),
            minute: parseInt(minute),
            dateId: parseInt(date)
        };
        try {
            await axios.post('http://localhost:5667/api/v1/time/add', gameData);
            onAdd();
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add a Time <FontAwesomeIcon icon={faClock}/></h2>
            <form onSubmit={handleSubmit}>
                <label>Hour:</label>
                <input
                    type="number"
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                />
                <label>Minute:</label>
                <input
                    type="number"
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                />
                <label>Date ID:</label>
                <input
                    type="number"
                    value={date}
                    onChange={(e) => setDateId(e.target.value)}
                />
                <button type="submit">Add Time</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default TimeForm;
