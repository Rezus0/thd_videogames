import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DateUpdateForm = ({ date, onEdit, onCancel }) => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    useEffect(() => {
        if (date) {
            setYear(date.year);
            setMonth(date.month);
            setDay(date.day);
        }
    }, [date]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dateData = {
            year: parseInt(year),
            month: parseInt(month),
            day: parseInt(day)
        };
        try {
            await axios.post(`http://localhost:5667/api/v1/date/update/${date.id}`, dateData);
            onEdit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit a Date <FontAwesomeIcon icon={faCalendarDays}/></h2>
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
                <button type="submit">Edit Date</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default DateUpdateForm;
