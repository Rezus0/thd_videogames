import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {faGamepad, faPeopleGroup} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DevUpdateForm = ({ dev, onEdit, onCancel }) => {
    const [devTitle, setDevTitle] = useState('');
    const [country, setCountry] = useState('');
    const [devEmployeeNumber, setDevEmployeeNumber] = useState('');

    useEffect(() => {
        if (dev) {
            setDevTitle(dev.devTitle);
            setCountry(dev.country);
            setDevEmployeeNumber(dev.devEmployeeNumber);
        }
    }, [dev]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const devData = {
            devTitle: devTitle,
            country: country,
            devEmployeeNumber: parseInt(devEmployeeNumber)
        };
        try {
            await axios.post(`http://localhost:5667/api/v1/developers/update/${dev.id}`, devData);
            onEdit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit a Developer <FontAwesomeIcon icon={faPeopleGroup}/></h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={devTitle}
                    onChange={(e) => setDevTitle(e.target.value)}
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
                <button type="submit">Edit Developer</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default DevUpdateForm;
