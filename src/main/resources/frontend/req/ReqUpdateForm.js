import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ReqUpdateForm = ({ req, onEdit, onCancel }) => {
    const [processor, setProcessor] = useState('');
    const [requiredSpace, setRequiredSpace] = useState('');
    const [ram, setRam] = useState('');
    const [gpu, setGpu] = useState('');
    const [os, setOs] = useState('');

    const [ramError, setRamError] = useState(false);
    const [spaceError, setSpaceError] = useState(false);

    useEffect(() => {
        if (ram === '') {
            setRamError(false);
            return;
        }
        if (ram <= 0 || !Number.isInteger(Number(ram))) {
            setRamError(true);
        } else {
            setRamError(false);
        }
    }, [ram]);

    useEffect(() => {
        if (requiredSpace === '') {
            setSpaceError(false);
            return;
        }
        if (requiredSpace <= 0 || !Number.isInteger(Number(requiredSpace))) {
            setSpaceError(true);
        } else {
            setSpaceError(false);
        }
    }, [requiredSpace]);

    useEffect(() => {
        if (req) {
            setProcessor(req.processor);
            setRequiredSpace(req.requiredSpace);
            setRam(req.ram);
            setGpu(req.gpu);
            setOs(req.os);
        }
    }, [req]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (ramError || spaceError || processor === '' || gpu === '' || os === '') {
            return;
        }
        const reqData = {
            processor: processor,
            requiredSpace: parseInt(requiredSpace),
            ram: parseInt(ram),
            gpu: gpu,
            os: os
        };
        try {
            await axios.post(`http://localhost:5667/api/v1/sys-req/update/${req.id}`, reqData);
            onEdit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit a Requirement <FontAwesomeIcon icon={faGear}/></h2>
            <form onSubmit={handleSubmit}>
                <label>GPU:</label>
                <input
                    type="text"
                    value={gpu}
                    onChange={(e) => setGpu(e.target.value)}
                />
                <label>OS:</label>
                <input
                    type="text"
                    value={os}
                    onChange={(e) => setOs(e.target.value)}
                />
                <label>RAM (MB):</label>
                <input
                    type="number"
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                    className={ramError ? 'error' : ''}
                />
                {ramError &&
                    <b className="error-message">
                        RAM must be a positive integer.
                    </b>
                }
                <label>Processor:</label>
                <input
                    type="text"
                    value={processor}
                    onChange={(e) => setProcessor(e.target.value)}
                />
                <label>Required space (GB):</label>
                <input
                    type="number"
                    value={requiredSpace}
                    onChange={(e) => setRequiredSpace(e.target.value)}
                    className={spaceError ? 'error' : ''}
                />
                {spaceError &&
                    <b className='error-message'>
                        Required Space must be a positive integer.
                    </b>
                }
                <button type="submit">Edit Requirement</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default ReqUpdateForm;
