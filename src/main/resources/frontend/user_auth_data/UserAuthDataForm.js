import React, { useState } from 'react';
import axios from 'axios';
import {faGamepad, faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserAuthDataForm = ({ onAdd, onCancel }) => {
    const [userId, setUserId] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            userId: parseInt(userId),
            login: login,
            password: password
        };
        try {
            await axios.post('http://localhost:5667/api/v1/auth-data/add', userData);
            onAdd();
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add an User Auth Data <FontAwesomeIcon icon={faLock}/></h2>
            <form onSubmit={handleSubmit}>
                <label>Login:</label>
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>User ID:</label>
                <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button type="submit">Add User Auth Data</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default UserAuthDataForm;
