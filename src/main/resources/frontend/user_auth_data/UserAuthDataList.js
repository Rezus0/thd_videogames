import React, {useEffect, useState} from 'react';
import axios from 'axios';
import UserAuthDataUpdateForm from './UserAuthDataUpdateForm';
import UserAuthDataForm from './UserAuthDataForm';
import Modal from 'react-modal';
import DeleteUserAuthDataForm from './DeleteUserAuthDataForm';
import FilterUserAuthDataForm from './FilterUserAuthDataForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes, faGamepad, faGear, faLock} from '@fortawesome/free-solid-svg-icons';

const UserAuthDataList = () => {
    const [userAuthDataList, setUserAuthDataList] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [selectedUserAuthData, setSelectedUserAuthData] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        const fetchUserAuthDataList = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/auth-data/all', {
                    params: searchParams,
                });
                setUserAuthDataList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        if (isUpdateNeeded)
            fetchUserAuthDataList();
        setIsUpdateNeeded(false);
    }, [isUpdateNeeded]);

    const onConfirmPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedUserAuthData(null);
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
                setSelectedUserAuthData(null);
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
                <b>User Auth Data List <FontAwesomeIcon icon={faLock}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add user auth data
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
                contentLabel="Add a new User Auth Data"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <UserAuthDataForm onAdd={() => onConfirmPressed('add')} onCancel={() => onCancelPressed('add')}/>
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
                <FilterUserAuthDataForm onFilter={onSearch} onCancel={() => onCancelPressed('filter')}
                                        params={searchParams}/>
            </Modal>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Login</th>
                        <th>Password</th>
                        <th>User ID</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {userAuthDataList.map((userAuthData) => (
                        <tr key={userAuthData.id}>
                            <td>{userAuthData.id}</td>
                            <td>{userAuthData.login}</td>
                            <td>{userAuthData.password}</td>
                            <td>{userAuthData.user}</td>
                            <td>
                                <button className="delete" onClick={() => setDeletingId(userAuthData.id)}>
                                    Delete
                                </button>
                                <button onClick={() => setSelectedUserAuthData(userAuthData)}>Update</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={deletingId}
                onRequestClose={() => setDeletingId(null)}
                contentLabel="Delete User Auth Data"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DeleteUserAuthDataForm
                        userAuthDataId={deletingId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={selectedUserAuthData}
                onRequestClose={() => setSelectedUserAuthData(null)}
                contentLabel="Update User Auth Data"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <UserAuthDataUpdateForm
                        userAuthData={selectedUserAuthData}
                        onEdit={() => onConfirmPressed('update')}
                        onCancel={() => onCancelPressed('update')}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default UserAuthDataList;
