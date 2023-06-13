import React, { useState } from 'react';
import axios from 'axios';
import {faBagShopping, faGamepad} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PurchaseForm = ({ onAdd, onCancel }) => {
    const [soldGame, setSoldGame] = useState('');
    const [user, setUser] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const purchaseData = {
            soldGameId: parseInt(soldGame),
            userId: parseInt(user),
            timeId: parseInt(time),
        };
        try {
            await axios.post('http://localhost:5667/api/v1/purchase/add', purchaseData);
            onAdd();
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add a Purchase <FontAwesomeIcon icon={faBagShopping} /></h2>
            <form onSubmit={handleSubmit}>
                <label>Sold Game ID:</label>
                <input
                    type="number"
                    value={soldGame}
                    onChange={(e) => setSoldGame(e.target.value)}
                />
                <label>User ID:</label>
                <input
                    type="number"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <label>Time ID:</label>
                <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button type="submit">Add Purchase</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default PurchaseForm;
