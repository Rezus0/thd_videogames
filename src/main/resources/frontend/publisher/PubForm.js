import React, { useState } from 'react';
import axios from 'axios';
import {faGamepad, faPeopleGroup} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PubForm = ({onAdd, onCancel}) => {
    const [pubTitle, setTitle] = useState('');
    const [country, setCountry] = useState('');
    const [pubEmployeeNumber, setPubEmployeeNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pubData = {
            pubTitle: pubTitle,
            pubEmployeeNumber: parseInt(pubEmployeeNumber),
            country: country
        };
        try {
            await axios.post('http://localhost:5667/api/v1/publishers/add', pubData);
            onAdd();
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add a Publishers <FontAwesomeIcon icon={faPeopleGroup}/></h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={pubTitle}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Country:</label>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <label>Employee number:</label>
                <input
                    type="number"
                    value={pubEmployeeNumber}
                    onChange={(e) => setPubEmployeeNumber(e.target.value)}
                />
                <button type="submit">Add Publishers</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default PubForm;
