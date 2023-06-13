import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes, faStore} from '@fortawesome/free-solid-svg-icons';
import UserForm from "../user/UserForm";
import StoreForm from "./StoreForm";
import FilterUserForm from "../user/FilterUserForm";
import FilterStoreForm from "./FilterStoreForm";
import DeleteUserForm from "../user/DeleteUserForm";
import DeleteStoreForm from "./DeleteStoreForm";
import UserUpdateForm from "../user/UserUpdateForm";
import StoreUpdateForm from "./StoreUpdateForm";

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/stores/all', {
                    params: searchParams,
                });
                setStores(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        if (isUpdateNeeded)
            fetchStores();
        setIsUpdateNeeded(false);
    }, [isUpdateNeeded]);

    const onConfirmPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedStore(null);
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
        }
        setIsUpdateNeeded(true);
    };

    const onCancelPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedStore(null);
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
                break;
            }
        }
    };

    const onSearch = async (filters) => {
        setSearchParams(filters);
        setIsUpdateNeeded(true);
        setFilterModal(false);
    };

    const clearFilters = async () => {
        setSearchParams({});
        setIsUpdateNeeded(true);
    };

    return (
        <div>
            <div className="content-above">
                <b>Stores List <FontAwesomeIcon icon={faStore}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add store
                </button>
                <button className="filter-button" type="button" onClick={() => setFilterModal(true)}>
                    <FontAwesomeIcon icon={faSearch} size="lg"/>
                </button>
                <button className="clear-button" type="button" onClick={() => clearFilters()}>
                    <FontAwesomeIcon icon={faTimes} size="lg"/>
                </button>
            </div>
            <Modal
                isOpen={isCreateFormVisible}
                onRequestClose={() => setCreateFormVisible(false)}
                contentLabel="Add a new Store"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <StoreForm onAdd={() => onConfirmPressed('add')}
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
                <FilterStoreForm
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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {stores.map((store) => (
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.storeTitle}</td>
                            <td>{store.country}</td>
                            <td>
                                <button className="delete" onClick={() => setDeletingId(store.id)}>
                                    Delete
                                </button>
                                <button onClick={() => setSelectedStore(store)}>Update</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={deletingId}
                onRequestClose={() => setDeletingId(null)}
                contentLabel="Delete Store"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DeleteStoreForm
                        storeId={deletingId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={selectedStore}
                onRequestClose={() => setSelectedStore(null)}
                contentLabel="Update Store"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <StoreUpdateForm
                        store={selectedStore}
                        onEdit={() => onConfirmPressed('update')}
                        onCancel={() => onCancelPressed('update')}/>
                </div>
            </Modal>
        </div>
    );
};

export default StoreList;
