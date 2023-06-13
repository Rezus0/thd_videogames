import React, { useState } from 'react';
import axios from 'axios';
import {faGamepad, faPeopleGroup} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DevForm = ({onAdd, onCancel}) => {
    const [devTitle, setTitle] = useState('');
    const [country, setCountry] = useState('');
    const [devEmployeeNumber, setDevEmployeeNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const devData = {
            devTitle: devTitle,
            devEmployeeNumber: parseInt(devEmployeeNumber),
            country: country
        };
        try {
            await axios.post('http://localhost:5667/api/v1/developers/add', devData);
            onAdd();
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add a Developer <FontAwesomeIcon icon={faPeopleGroup}/></h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={devTitle}
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
                    value={devEmployeeNumber}
                    onChange={(e) => setDevEmployeeNumber(e.target.value)}
                />
                <button type="submit">Add Developer</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default DevForm;
