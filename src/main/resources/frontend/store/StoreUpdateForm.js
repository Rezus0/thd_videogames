import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {faStore} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StoreUpdateForm = ({ store, onEdit, onCancel }) => {
    const [storeTitle, setStoreTitle] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (store) {
            setStoreTitle(store.storeTitle);
            setCountry(store.country);
        }
    }, [store]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storeData = {
            storeTitle: storeTitle,
            country: country
        };
        try {
            await axios.post(`http://localhost:5667/api/v1/stores/update/${store.id}`, storeData);
            onEdit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit Store <FontAwesomeIcon icon={faStore} /></h2>
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
                <button type="submit">Edit Store</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default StoreUpdateForm;
