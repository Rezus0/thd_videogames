import React, { useState } from 'react';
import axios from 'axios';
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DateForm = ({onAdd, onCancel}) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dateData = {
            day: day,
            month: month,
            year: year
        };
        try {
            await axios.post('http://localhost:5667/api/v1/date/add', dateData);
            onAdd();
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add a Date <FontAwesomeIcon icon={faCalendarDays}/></h2>
            <form onSubmit={handleSubmit}>
                <label>Day:</label>
                <input
                    type="number"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
                <label>Month:</label>
                <input
                    type="number"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
                <label>Year:</label>
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <button type="submit">Add Date</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default DateForm;
