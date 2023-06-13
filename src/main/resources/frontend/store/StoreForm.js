import React, { useState } from 'react';
import axios from 'axios';
import {faStore} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StoreForm = ({ onAdd, onCancel }) => {
    const [storeTitle, setStoreTitle] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storeData = {
            storeTitle: storeTitle,
            country: country
        };
        try {
            await axios.post('http://localhost:5667/api/v1/stores/add', storeData);
            onAdd();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add a Store <FontAwesomeIcon icon={faStore} /></h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={storeTitle}
                    onChange={(e) => setStoreTitle(e.target.value)}
                />
                <label>Country:</label>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <button type="submit">Add Store</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default StoreForm;
