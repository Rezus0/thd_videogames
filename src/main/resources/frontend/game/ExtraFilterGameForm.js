import React, { useEffect, useState } from 'react';

const ExtraFilterGameForm = ({ onFilter, onCancel, params }) => {
    const [requiredSpaceEnabled, setRequiredSpaceEnabled] = useState(false);
    const [yearEnabled, setYearEnabled] = useState(false);

    const [requiredSpace, setRequiredSpace] = useState(null);
    const [year, setYear] = useState(null);

    useEffect(() => {
        if (params.requiredSpace) {
            setRequiredSpaceEnabled(true);
            setRequiredSpace(params.requiredSpace);
        }
        if (params.year) {
            setYearEnabled(true);
            setYear(params.year);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            ...params,
            requiredSpace: requiredSpaceEnabled ? requiredSpace : null,
            year: yearEnabled ? year : null
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
            <form onSubmit={handleFilter}>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button extra ${requiredSpaceEnabled ? 'active' : ''}`}
                        onClick={() => setRequiredSpaceEnabled(!requiredSpaceEnabled)}
                    >
                        Required Space (Min Req)
                    </button>
                    {requiredSpaceEnabled && (
                        <input
                            type="number"
                            value={requiredSpace}
                            onChange={(e) => setRequiredSpace(e.target.value)}
                        />
                    )}
                </div>
                <div className="filter-option">
                    <button
                        type="button"
                        className={`filter-option-button extra ${yearEnabled ? 'active' : ''}`}
                        onClick={() => setYearEnabled(!yearEnabled)}
                    >
                        Year (Release Date)
                    </button>
                    {yearEnabled && (
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
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

export default ExtraFilterGameForm;
