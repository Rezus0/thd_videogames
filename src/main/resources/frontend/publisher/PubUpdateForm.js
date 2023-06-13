import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {faGamepad, faPeopleGroup} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PubUpdateForm = ({ pub, onEdit, onCancel }) => {
    const [pubTitle, setPubTitle] = useState('');
    const [country, setCountry] = useState('');
    const [pubEmployeeNumber, setPubEmployeeNumber] = useState('');

    useEffect(() => {
        if (pub) {
            setPubTitle(pub.pubTitle);
            setCountry(pub.country);
            setPubEmployeeNumber(pub.pubEmployeeNumber);
        }
    }, [pub]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pubData = {
            pubTitle: pubTitle,
            country: country,
            pubEmployeeNumber: parseInt(pubEmployeeNumber)
        };
        try {
            await axios.post(`http://localhost:5667/api/v1/publishers/update/${pub.id}`, pubData);
            onEdit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit a Publisher <FontAwesomeIcon icon={faPeopleGroup}/></h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={pubTitle}
                    onChange={(e) => setPubTitle(e.target.value)}
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
                <button type="submit">Edit Publisher</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default PubUpdateForm;
