import React, {useEffect, useState} from 'react';

const FilterDevForm = ({ onFilter, onCancel, params }) => {
    const [devTitleEnabled, setDevTitleEnabled] = useState(false);
    const [countryEnabled, setCountryEnabled] = useState(false);
    const [devEmployeeNumberEnabled, setDevEmployeeNumberEnabled] = useState(false);

    const [devTitle, setDevTitle] = useState(null);
    const [country, setCountry] = useState(null);
    const [devEmployeeNumber, setDevEmployeeNumber] = useState(null);

    useEffect(() => {
        if (params.devTitle) {
            setDevTitleEnabled(true);
            setDevTitle(params.devTitle);
        }
        if (params.country) {
            setCountryEnabled(true);
            setCountry(params.country);
        }
        if (params.devEmployeeNumber) {
            setDevEmployeeNumberEnabled(true);
            setDevEmployeeNumber(params.devEmployeeNumber);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            devTitle: devTitleEnabled ? devTitle : null,
            country: countryEnabled ? country : null,
            devEmployeeNumber: devEmployeeNumberEnabled ? devEmployeeNumber : null
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
        <form onSubmit={handleFilter}>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${devTitleEnabled ? 'active' : ''}`}
                    onClick={() => setDevTitleEnabled(!devTitleEnabled)}
                >
                    Title
                </button>
                {devTitleEnabled && (
                    <input
                        type="text"
                        value={devTitle}
                        onChange={(e) => setDevTitle(e.target.value)}
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
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${devEmployeeNumberEnabled ? 'active' : ''}`}
                    onClick={() => setDevEmployeeNumberEnabled(!devEmployeeNumberEnabled)}
                >
                    Employee number
                </button>
                {devEmployeeNumberEnabled && (
                    <input
                        type="number"
                        value={devEmployeeNumber}
                        onChange={(e) => setDevEmployeeNumber(e.target.value)}
                    />
                )}
            </div>
            <button type="submit">Filter</button>
            <button type="button" className="filter-option-cancel" onClick={onCancel}>Cancel</button>
        </form>
        </div>
    );
};

export default FilterDevForm;
