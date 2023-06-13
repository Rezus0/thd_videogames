import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReqUpdateForm from "./ReqUpdateForm";
import ReqForm from "./ReqForm";
import Modal from "react-modal";
import DeleteReqForm from "./DeleteReqForm";
import FilterForm from "./FilterForm";
import '../styles/List.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes, faGear} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import "../styles/Form.css"
import "../styles/FilterForm.css"

library.add(faSearch, faTimes, faGear);

const ReqList = () => {
    const [reqs, setReqs] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    const [updateReq, setUpdateReq] = useState(null);
    const [deleteReqId, setDeleteReqId] = useState(null);


    useEffect(() => {
        const fetchReqs = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/sys-req/all', {params: searchParams});
                setReqs(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        if (isUpdateNeeded)
            fetchReqs();
        setIsUpdateNeeded(false);
    }, [isUpdateNeeded]);

    const onConfirmPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setUpdateReq(null);
                break;
            }
            case 'add': {
                setCreateFormVisible(false);
                break;
            }
            case 'delete': {
                setDeleteReqId(null);
            }
        }
        setIsUpdateNeeded(true);
    }

    const onCancelPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setUpdateReq(null);
                break;
            }
            case 'add': {
                setCreateFormVisible(false);
                break;
            }
            case 'delete': {
                setDeleteReqId(null);
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
                <b>Requirements List <FontAwesomeIcon icon={faGear}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add requirement
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
                contentLabel="Add a new Requirement"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <ReqForm onAdd={() => onConfirmPressed('add')}
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
                <FilterForm
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
                    <th>GPU</th>
                    <th>OS</th>
                    <th>RAM (MB)</th>
                    <th>Processor</th>
                    <th>Required space (GB)</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {reqs.map((req) => (<tr key={req.id}>
                    <td>{req.id}</td>
                    <td>{req.gpu}</td>
                    <td>{req.os}</td>
                    <td>{req.ram}</td>
                    <td>{req.processor}</td>
                    <td>{req.requiredSpace}</td>
                    <td>
                        <button
                            className="delete"
                            onClick={() => setDeleteReqId(req.id)}
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setUpdateReq(req)}
                        >
                            Update
                        </button>
                    </td>
                </tr>))}
                </tbody>
            </table>
            <Modal
                isOpen={deleteReqId}
                onRequestClose={() => setDeleteReqId(null)}
                contentLabel="Delete Requirement"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DeleteReqForm
                        reqId={deleteReqId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={updateReq}
                onRequestClose={() => setUpdateReq(null)}
                contentLabel="Update Requirement"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <ReqUpdateForm req={updateReq}
                                   onEdit={() => onConfirmPressed('update')}
                                   onCancel={() => onCancelPressed('update')}/>
                </div>
            </Modal>
        </div>
        </div>);
};

export default ReqList;
