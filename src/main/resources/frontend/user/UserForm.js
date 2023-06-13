import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserForm = ({ onAdd, onCancel }) => {
    const [nickname, setNickname] = useState('');
    const [balance, setBalance] = useState('');
    const [regTime, setRegTime] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            nickname: nickname,
            balance: parseFloat(balance),
            regTimeId: parseInt(regTime),
            country: country,
        };
        try {
            await axios.post('http://localhost:5667/api/v1/users/add', userData);
            onAdd();
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add a User <FontAwesomeIcon icon={faUser} /></h2>
            <form onSubmit={handleSubmit}>
                <label>Nickname:</label>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <label>Balance ($):</label>
                <input
                    type="number"
                    value={balance}
                    step="0.01"
                    onChange={(e) => setBalance(e.target.value)}
                />
                <label>Registration Time ID:</label>
                <input
                    type="number"
                    value={regTime}
                    onChange={(e) => setRegTime(e.target.value)}
                />
                <label>Country:</label>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <button type="submit">Add User</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UserForm;
