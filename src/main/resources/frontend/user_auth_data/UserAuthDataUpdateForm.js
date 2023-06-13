import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {faGamepad, faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserAuthDataUpdateForm = ({ userAuthData, onEdit, onCancel }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        if (userAuthData) {
            setLogin(userAuthData.login);
            setPassword(userAuthData.password);
            setUserId(userAuthData.user);
        }
    }, [userAuthData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authData = {
            login: login,
            password: password,
            userId: parseInt(userId),
        };
        try {
            await axios.post(`http://localhost:5667/api/v1/auth-data/update/${userAuthData.id}`, authData);
            onEdit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit an Auth Data <FontAwesomeIcon icon={faLock} /></h2>
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
                <button type="submit">Edit Auth Data</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default UserAuthDataUpdateForm;
