import React, {useEffect, useState} from 'react';

const FilterDateForm = ({ onFilter, onCancel, params }) => {
    const [dayEnabled, setDayEnabled] = useState(false);
    const [monthEnabled, setMonthEnabled] = useState(false);
    const [yearEnabled, setYearEnabled] = useState(false);

    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);

    useEffect(() => {
        if (params.day) {
            setDayEnabled(true);
            setDay(params.day);
        }
        if (params.month) {
            setMonthEnabled(true);
            setMonth(params.month);
        }
        if (params.year) {
            setYearEnabled(true);
            setYear(params.year);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            day: dayEnabled ? day : null,
            month: monthEnabled ? month : null,
            year: yearEnabled ? year : null,
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
        <form onSubmit={handleFilter}>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${dayEnabled ? 'active' : ''}`}
                    onClick={() => setDayEnabled(!dayEnabled)}
                >
                    Day
                </button>
                {dayEnabled && (
                    <input
                        type="number"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${monthEnabled ? 'active' : ''}`}
                    onClick={() => setMonthEnabled(!monthEnabled)}
                >
                    Month
                </button>
                {monthEnabled && (
                    <input
                        type="number"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${yearEnabled ? 'active' : ''}`}
                    onClick={() => setYearEnabled(!yearEnabled)}
                >
                    Year
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
            <button type="button" className="filter-option-cancel" onClick={onCancel}>Cancel</button>
        </form>
        </div>
    );
};

export default FilterDateForm;
