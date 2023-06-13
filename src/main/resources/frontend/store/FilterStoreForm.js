import React, { useEffect, useState } from 'react';

const FilterStoreForm = ({ onFilter, onCancel, params }) => {
    const [titleEnabled, setTitleEnabled] = useState(false);
    const [countryEnabled, setCountryEnabled] = useState(false);
    const [storeTitle, setStoreTitle] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (params.storeTitle) {
            setTitleEnabled(true);
            setStoreTitle(params.storeTitle);
        }
        if (params.country) {
            setCountryEnabled(true);
            setCountry(params.country);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            storeTitle: titleEnabled ? storeTitle : null,
            country: countryEnabled ? country : null
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
            <form onSubmit={handleFilter}>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button ${titleEnabled ? 'active' : ''}`}
                        onClick={() => setTitleEnabled(!titleEnabled)}
                    >
                        Title
                    </button>
                    {titleEnabled && (
                        <input
                            type="text"
                            value={storeTitle}
                            onChange={(e) => setStoreTitle(e.target.value)}
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

export default FilterStoreForm;
