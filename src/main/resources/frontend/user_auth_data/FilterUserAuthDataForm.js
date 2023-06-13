import React, { useEffect, useState } from 'react';

const FilterUserAuthDataForm = ({ onFilter, onCancel, params }) => {
    const [userIdEnabled, setUserIdEnabled] = useState(false);
    const [loginEnabled, setLoginEnabled] = useState(false);
    const [passwordEnabled, setPasswordEnabled] = useState(false);

    const [userId, setUserId] = useState(null);
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        if (params.userId) {
            setUserIdEnabled(true);
            setUserId(params.userId);
        }
        if (params.login) {
            setLoginEnabled(true);
            setLogin(params.login);
        }
        if (params.password) {
            setPasswordEnabled(true);
            setPassword(params.password);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            userId: userIdEnabled ? userId : null,
            login: loginEnabled ? login : null,
            password: passwordEnabled ? password : null,
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
            <form onSubmit={handleFilter}>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${loginEnabled ? 'active' : ''}`}
                        onClick={() => setLoginEnabled(!loginEnabled)}
                    >
                        Login
                    </button>
                    {loginEnabled && (
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${passwordEnabled ? 'active' : ''}`}
                        onClick={() => setPasswordEnabled(!passwordEnabled)}
                    >
                        Password
                    </button>
                    {passwordEnabled && (
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${userIdEnabled ? 'active' : ''}`}
                        onClick={() => setUserIdEnabled(!userIdEnabled)}
                    >
                        User ID
                    </button>
                    {userIdEnabled && (
                        <input
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    )}
                </div>
                <button type="submit">Filter</button>
                <button type="button" className="filter-option-cancel" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default FilterUserAuthDataForm;
