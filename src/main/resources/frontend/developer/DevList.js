import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DevUpdateForm from "./DevUpdateForm";
import DevForm from "./DevForm";
import Modal from "react-modal";
import DeleteDevForm from "./DeleteDevForm";
import FilterDevForm from "./FilterDevForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes, faGamepad, faGear, faPeopleGroup, faStar} from "@fortawesome/free-solid-svg-icons";
import ExtraFilterUserForm from "../user/ExtraFilterUserForm";
import ExtraFilterDeveloperForm from "./ExtraFilterDeveloperForm";

const DevList = () => {
    const [devs, setDevs] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [selectedDev, setSelectedDev] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useState({});
    const [extraModal, setExtraModal] = useState(false);

    useEffect(() => {
        const fetchDevs = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/developers/all',
                    {params: searchParams});
                setDevs(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        if (isUpdateNeeded)
            fetchDevs();
        setIsUpdateNeeded(false);
    }, [isUpdateNeeded]);

    const onConfirmPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedDev(null);
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
                setSelectedDev(null);
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
                setExtraModal(false);
            }
        }

    }

    const onSearch = async (filters) => {
        setSearchParams(filters);
        setIsUpdateNeeded(true);
        setFilterModal(false);
        setExtraModal(false);
    }

    const clearFilters = async () => {
        setSearchParams({});
        setIsUpdateNeeded(true);
    }

    return (
        <div>
            <div className="content-above">
                <b>Developers List <FontAwesomeIcon icon={faPeopleGroup}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add developer
                </button>
                <button className="filter-button" type="button" onClick={() => setFilterModal(true)}>
                    <FontAwesomeIcon icon={faSearch} size={"lg"}/>
                </button>
                <button className="filter-button" type="extra" onClick={() => setExtraModal(true)}>
                    <FontAwesomeIcon icon={faStar} size="lg"/>
                </button>
                <button className="clear-button" type="button" onClick={() => clearFilters()}>
                    <FontAwesomeIcon icon={faTimes} size={"lg"}/>
                </button>
            </div>
            <Modal
                isOpen={isCreateFormVisible}
                onRequestClose={() => setCreateFormVisible(false)}
                contentLabel="Add a new Developer"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DevForm onAdd={() => onConfirmPressed('add')}
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
                <FilterDevForm
                    onFilter={onSearch}
                    onCancel={() => onCancelPressed('filter')}
                    params={searchParams}
                />
            </Modal>
            <Modal
                isOpen={extraModal}
                onRequestClose={() => setExtraModal(false)}
                contentLabel="Extra"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <ExtraFilterDeveloperForm
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
                        <th>Title</th>
                        <th>Country</th>
                        <th>Employee number</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {devs.map((dev) => (
                        <tr key={dev.id}>
                            <td>{dev.id}</td>
                            <td>{dev.devTitle}</td>
                            <td>{dev.country}</td>
                            <td>{dev.devEmployeeNumber}</td>
                            <td>
                                <button className="delete" onClick={() => setDeletingId(dev.id)}>Delete</button>
                                <button onClick={() => setSelectedDev(dev)}>Update</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={deletingId}
                onRequestClose={() => setDeletingId(null)}
                contentLabel="Delete Developer"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DeleteDevForm
                        devId={deletingId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={selectedDev}
                onRequestClose={() => setSelectedDev(null)}
                contentLabel="Update Developer"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content"><DevUpdateForm dev={selectedDev}
                                                              onEdit={() => onConfirmPressed('update')}
                                                              onCancel={() => onCancelPressed('update')}/>
                </div>
            </Modal>
        </div>
    );
};

export default DevList;
