import React, {useEffect, useState} from 'react';

const FilterPubForm = ({ onFilter, onCancel, params }) => {
    const [pubTitleEnabled, setPubTitleEnabled] = useState(false);
    const [countryEnabled, setCountryEnabled] = useState(false);
    const [pubEmployeeNumberEnabled, setPubEmployeeNumberEnabled] = useState(false);

    const [pubTitle, setPubTitle] = useState(null);
    const [country, setCountry] = useState(null);
    const [pubEmployeeNumber, setPubEmployeeNumber] = useState(null);

    useEffect(() => {
        if (params.pubTitle) {
            setPubTitleEnabled(true);
            setPubTitle(params.pubTitle);
        }
        if (params.country) {
            setCountryEnabled(true);
            setCountry(params.country);
        }
        if (params.pubEmployeeNumber) {
            setPubEmployeeNumberEnabled(true);
            setPubEmployeeNumber(params.pubEmployeeNumber);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            pubTitle: pubTitleEnabled ? pubTitle : null,
            country: countryEnabled ? country : null,
            pubEmployeeNumber: pubEmployeeNumberEnabled ? pubEmployeeNumber : null
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
        <form onSubmit={handleFilter}>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${pubTitleEnabled ? 'active' : ''}`}
                    onClick={() => setPubTitleEnabled(!pubTitleEnabled)}
                >
                    Title
                </button>
                {pubTitleEnabled && (
                    <input
                        type="text"
                        value={pubTitle}
                        onChange={(e) => setPubTitle(e.target.value)}
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
                    className={`filter-option-button ${pubEmployeeNumberEnabled ? 'active' : ''}`}
                    onClick={() => setPubEmployeeNumberEnabled(!pubEmployeeNumberEnabled)}
                >
                    Employee number
                </button>
                {pubEmployeeNumberEnabled && (
                    <input
                        type="number"
                        value={pubEmployeeNumber}
                        onChange={(e) => setPubEmployeeNumber(e.target.value)}
                    />
                )}
            </div>
            <button type="submit">Filter</button>
            <button type="button" className="filter-option-cancel" onClick={onCancel}>Cancel</button>
        </form>
        </div>
    );
};

export default FilterPubForm;
