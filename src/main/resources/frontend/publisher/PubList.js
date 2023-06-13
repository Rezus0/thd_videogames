import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PubUpdateForm from "./PubUpdateForm";
import PubForm from "./PubForm";
import Modal from "react-modal";
import DeletePubForm from "./DeletePubForm";
import FilterPubForm from "./FilterPubForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes, faPeopleGroup} from "@fortawesome/free-solid-svg-icons";

const PubList = () => {
    const [pubs, setPubs] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [selectedPub, setSelectedPub] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        const fetchPubs = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/publishers/all',
                    {params: searchParams});
                setPubs(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        if (isUpdateNeeded)
            fetchPubs();
        setIsUpdateNeeded(false);
    }, [isUpdateNeeded]);

    const onConfirmPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedPub(null);
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
                setSelectedPub(null);
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
                <b>Publishers List <FontAwesomeIcon icon={faPeopleGroup}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add publisher
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
                contentLabel="Add a new Publisher"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <PubForm onAdd={() => onConfirmPressed('add')}
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
                <FilterPubForm
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
                    {pubs.map((pub) => (
                        <tr key={pub.id}>
                            <td>{pub.id}</td>
                            <td>{pub.pubTitle}</td>
                            <td>{pub.country}</td>
                            <td>{pub.pubEmployeeNumber}</td>
                            <td>
                                <button className="delete" onClick={() => setDeletingId(pub.id)}>Delete</button>
                                <button onClick={() => setSelectedPub(pub)}>Update</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={deletingId}
                onRequestClose={() => setDeletingId(null)}
                contentLabel="Delete Publisher"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DeletePubForm
                        pubId={deletingId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={selectedPub}
                onRequestClose={() => setSelectedPub(null)}
                contentLabel="Update Publisher"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content"><PubUpdateForm pub={selectedPub}
                                                              onEdit={() => onConfirmPressed('update')}
                                                              onCancel={() => onCancelPressed('update')}/>
                </div>
            </Modal>
        </div>
    );
};

export default PubList;
