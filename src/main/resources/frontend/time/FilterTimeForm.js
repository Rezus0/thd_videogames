import React, {useEffect, useState} from 'react';

const FilterTimeForm = ({ onFilter, onCancel, params }) => {
    const [hourEnabled, setHourEnabled] = useState(false);
    const [minuteEnabled, setMinuteEnabled] = useState(false);
    const [dateIdEnabled, setDateIdEnabled] = useState(false);

    const [hour, setHour] = useState(null);
    const [minute, setMinute] = useState(null);
    const [dateId, setDateId] = useState(null);

    useEffect(() => {
        if (params.hour) {
            setHourEnabled(true);
            setHour(params.hour);
        }
        if (params.minute) {
            setMinuteEnabled(true);
            setMinute(params.minute);
        }
        if (params.dateId) {
            setDateIdEnabled(true);
            setDateId(params.dateId);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            hour: hourEnabled ? hour : null,
            minute: minuteEnabled ? minute : null,
            dateId: dateIdEnabled ? dateId : null,
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
        <form onSubmit={handleFilter}>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${hourEnabled ? 'active' : ''}`}
                    onClick={() => setHourEnabled(!hourEnabled)}
                >
                    Hour
                </button>
                {hourEnabled && (
                    <input
                        type="number"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${minuteEnabled ? 'active' : ''}`}
                    onClick={() => setMinuteEnabled(!minuteEnabled)}
                >
                    Minute
                </button>
                {minuteEnabled && (
                    <input
                        type="number"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${dateIdEnabled ? 'active' : ''}`}
                    onClick={() => setDateIdEnabled(!dateIdEnabled)}
                >
                    Date ID
                </button>
                {dateIdEnabled && (
                    <input
                        type="number"
                        value={dateId}
                        onChange={(e) => setDateId(e.target.value)}
                    />
                )}
            </div>
            <button type="submit">Filter</button>
            <button type="button" className="filter-option-cancel" onClick={onCancel}>Cancel</button>
        </form>
        </div>
    );
};

export default FilterTimeForm;
