import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserUpdateForm = ({ user, onEdit, onCancel }) => {
    const [nickname, setNickname] = useState('');
    const [balance, setBalance] = useState('');
    const [regTime, setRegTime] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (user) {
            setNickname(user.nickname);
            setBalance(user.balance);
            setRegTime(user.regTime);
            setCountry(user.country);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            nickname: nickname,
            balance: parseFloat(balance),
            regTimeId: parseInt(regTime),
            country: country,
        };
        try {
            await axios.post(`http://localhost:5667/api/v1/users/update/${user.id}`, userData);
            onEdit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit User <FontAwesomeIcon icon={faUser} /></h2>
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
                <button type="submit">Edit User</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UserUpdateForm;
