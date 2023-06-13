import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TimeUpdateForm from "./TimeUpdateForm";
import TimeForm from "./TimeForm";
import Modal from "react-modal";
import DeleteTimeForm from "./DeleteTimeForm";
import FilterTimeForm from "./FilterTimeForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes, faGamepad, faGear, faClock} from "@fortawesome/free-solid-svg-icons";

const TimeList = () => {
    const [times, setTimes] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        const fetchTimes = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/time/all',
                    {params: searchParams});
                setTimes(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        if (isUpdateNeeded)
            fetchTimes();
        setIsUpdateNeeded(false);
    }, [isUpdateNeeded]);

    const onConfirmPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedTime(null);
                break;
            }
            case 'add': {
                setCreateFormVisible(false);
                break;
            }
            case 'delete': {
                setDeletingId(null);
            }
        }
        setIsUpdateNeeded(true);
    }

    const onCancelPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedTime(null);
                break;
            }
            case 'add': {
                setCreateFormVisible(false);
                break;
            }
            case 'delete': {
                setDeletingId(null);
                break;
            }
            case 'filter': {
                setFilterModal(false);
            }
        }

    }

    const onSearch = async (filters) => {
        setSearchParams(filters);
        setIsUpdateNeeded(true);
        setFilterModal(false);
    }

    const clearFilters = async () => {
        setSearchParams({});
        setIsUpdateNeeded(true);
    }

    return (
        <div>
            <div className="content-above">
                <b>Time List <FontAwesomeIcon icon={faClock}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add time
                </button>
                <button className="filter-button" type="button" onClick={() => setFilterModal(true)}>
                    <FontAwesomeIcon icon={faSearch} size={"lg"}/>
                </button>
                <button className="clear-button" type="button" onClick={() => clearFilters()}>
                    <FontAwesomeIcon icon={faTimes} size={"lg"}/>
                </button>
            </div>
            <Modal
                isOpen={isCreateFormVisible}
                onRequestClose={() => setCreateFormVisible(false)}
                contentLabel="Add a new Time"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <TimeForm onAdd={() => onConfirmPressed('add')}
                              onCancel={() => onCancelPressed('add')}/>
                </div>
            </Modal>
            <Modal
                isOpen={filterModal}
                onRequestClose={() => setFilterModal(false)}
                contentLabel="Filters"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <FilterTimeForm
                    onFilter={onSearch}
                    onCancel={() => onCancelPressed('filter')}
                    params={searchParams}
                />
            </Modal>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hour</th>
                        <th>Minute</th>
                        <th>Date ID</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {times.map((time) => (
                        <tr key={time.id}>
                            <td>{time.id}</td>
                            <td>{time.hour}</td>
                            <td>{time.minute}</td>
                            <td>{time.date}</td>
                            <td>
                                <button className="delete" onClick={() => setDeletingId(time.id)}>Delete</button>
                                <button onClick={() => setSelectedTime(time)}>Update</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={deletingId}
                onRequestClose={() => setDeletingId(null)}
                contentLabel="Delete Time"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DeleteTimeForm
                        timeId={deletingId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={selectedTime}
                onRequestClose={() => setSelectedTime(null)}
                contentLabel="Update Time"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content"><TimeUpdateForm time={selectedTime}
                                                               onEdit={() => onConfirmPressed('update')}
                                                               onCancel={() => onCancelPressed('update')}/>
                </div>
            </Modal>
        </div>
    );
};

export default TimeList;
