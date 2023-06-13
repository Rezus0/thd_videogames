import React, { useEffect, useState } from 'react';

const FilterUserForm = ({ onFilter, onCancel, params }) => {
    const [nicknameEnabled, setNicknameEnabled] = useState(false);
    const [balanceEnabled, setBalanceEnabled] = useState(false);
    const [regTimeEnabled, setRegTimeEnabled] = useState(false);
    const [countryEnabled, setCountryEnabled] = useState(false);

    const [nickname, setNickname] = useState(null);
    const [balance, setBalance] = useState(null);
    const [regTime, setRegTime] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (params.nickname) {
            setNicknameEnabled(true);
            setNickname(params.nickname);
        }
        if (params.balance) {
            setBalanceEnabled(true);
            setBalance(params.balance);
        }
        if (params.regTimeId) {
            setRegTimeEnabled(true);
            setRegTime(params.regTimeId);
        }
        if (params.country) {
            setCountryEnabled(true);
            setCountry(params.country);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            nickname: nicknameEnabled ? nickname : null,
            balance: balanceEnabled ? balance : null,
            regTimeId: regTimeEnabled ? regTime : null,
            country: countryEnabled ? country : null,
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
            <form onSubmit={handleFilter}>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${nicknameEnabled ? 'active' : ''}`}
                        onClick={() => setNicknameEnabled(!nicknameEnabled)}
                    >
                        Nickname
                    </button>
                    {nicknameEnabled && (
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${balanceEnabled ? 'active' : ''}`}
                        onClick={() => setBalanceEnabled(!balanceEnabled)}
                    >
                        Balance ($)
                    </button>
                    {balanceEnabled && (
                        <input
                            type="number"
                            value={balance}
                            step="0.01"
                            onChange={(e) => setBalance(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${regTimeEnabled ? 'active' : ''}`}
                        onClick={() => setRegTimeEnabled(!regTimeEnabled)}
                    >
                        Registration Time ID
                    </button>
                    {regTimeEnabled && (
                        <input
                            type="number"
                            value={regTime}
                            onChange={(e) => setRegTime(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${countryEnabled ? 'active' : ''}`}
                        onClick={() => setCountryEnabled(!countryEnabled)}
                    >
                        Country
                    </button>
                    {countryEnabled && (
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
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

export default FilterUserForm;
