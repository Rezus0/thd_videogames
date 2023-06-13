import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes, faGamepad, faUser, faStar} from '@fortawesome/free-solid-svg-icons';
import GameForm from "../game/GameForm";
import UserForm from "./UserForm";
import FilterGameForm from "../game/FilterGameForm";
import FilterUserForm from "./FilterUserForm";
import DeleteGameForm from "../game/DeleteGameForm";
import DeleteUserForm from "./DeleteUserForm";
import GameUpdateForm from "../game/GameUpdateForm";
import UserUpdateForm from "./UserUpdateForm";
import ExtraFilterUserForm from "./ExtraFilterUserForm";

const UserList = () => {
    const [users, setUsers] = useState([]);

    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    const [extraModal, setExtraModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/users/all', {
                    params: searchParams
                });
                setUsers(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        if (isUpdateNeeded)
            fetchUsers();
        setIsUpdateNeeded(false);
    }, [isUpdateNeeded]);

    const onConfirmPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedUser(null);
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
                setSelectedUser(null);
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
                break;
            }
        }
    };

    const onSearch = async (filters) => {
        setSearchParams(filters);
        setIsUpdateNeeded(true);
        setFilterModal(false);
        setExtraModal(false);
    };

    const clearFilters = async () => {
        setSearchParams({});
        setIsUpdateNeeded(true);
    };

    return (
        <div>
            <div className="content-above">
                <b>Users List <FontAwesomeIcon icon={faUser}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add user
                </button>
                <button className="filter-button" type="button" onClick={() => setFilterModal(true)}>
                    <FontAwesomeIcon icon={faSearch} size="lg"/>
                </button>
                <button className="filter-button" type="extra" onClick={() => setExtraModal(true)}>
                    <FontAwesomeIcon icon={faStar} size="lg"/>
                </button>
                <button className="clear-button" type="button" onClick={() => clearFilters()}>
                    <FontAwesomeIcon icon={faTimes} size="lg"/>
                </button>
            </div>
            <Modal
                isOpen={isCreateFormVisible}
                onRequestClose={() => setCreateFormVisible(false)}
                contentLabel="Add a new User"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <UserForm onAdd={() => onConfirmPressed('add')}
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
                <FilterUserForm
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
                <ExtraFilterUserForm
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
                        <th>Nickname</th>
                        <th>Balance ($)</th>
                        <th>Registration Time ID</th>
                        <th>Country</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nickname}</td>
                            <td>{user.balance}</td>
                            <td>{user.regTime}</td>
                            <td>{user.country}</td>
                            <td>
                                <button className="delete" onClick={() => setDeletingId(user.id)}>
                                    Delete
                                </button>
                                <button onClick={() => setSelectedUser(user)}>Update</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={deletingId}
                onRequestClose={() => setDeletingId(null)}
                contentLabel="Delete User"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DeleteUserForm
                        userId={deletingId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={selectedUser}
                onRequestClose={() => setSelectedUser(null)}
                contentLabel="Update User"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <UserUpdateForm
                        user={selectedUser}
                        onEdit={() => onConfirmPressed('update')}
                        onCancel={() => onCancelPressed('update')}/>
                </div>
            </Modal>
        </div>
    );
};

export default UserList;
