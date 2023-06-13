import React from 'react';
import axios from 'axios';

const DeleteSoldGameForm = ({ soldGameId, onCancel, onConfirm }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5667/api/v1/sold_games/delete/${soldGameId}`);
            onConfirm();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Warning!</h3>
            <p>
                Deleting this sold game could also delete all associated records.
                Are you sure you want to proceed?
            </p>
            <div>
                <button onClick={handleDelete} className="confirm" type="submit">Confirm</button>
                <button onClick={onCancel} type="button">Cancel</button>
            </div>
        </div>
    );
};

export default DeleteSoldGameForm;
