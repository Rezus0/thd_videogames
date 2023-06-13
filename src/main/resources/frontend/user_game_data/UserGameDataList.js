import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GameDataUpdateForm from './GameDataUpdateForm';
import TimeForm from './GameDataForm';
import Modal from 'react-modal';
import DeleteTimeForm from './DeleteGameDataForm';
import FilterTimeForm from './FilterGameDataForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes, faGamepad, faGear, faClock, faNoteSticky} from '@fortawesome/free-solid-svg-icons';
import DeleteGameDataForm from "./DeleteGameDataForm";
import GameDataForm from "./GameDataForm";
import FilterGameDataForm from "./FilterGameDataForm";

const UserGameDataList = () => {
    const [gameData, setGameData] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [selectedGameData, setSelectedGameData] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/game-data/all', {
                    params: searchParams,
                });
                setGameData(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        if (isUpdateNeeded)
            fetchGameData();
        setIsUpdateNeeded(false);
    }, [searchParams, isUpdateNeeded]);

    const onConfirmPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedGameData(null);
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
            default:
                break;
        }
        setIsUpdateNeeded(true);
    };

    const onCancelPressed = (formType) => {
        switch (formType) {
            case 'update':
                setSelectedGameData(null);
                break;
            case 'add':
                setCreateFormVisible(false);
                break;
            case 'delete':
                setDeletingId(null);
                break;
            case 'filter':
                setFilterModal(false);
                break;
            default:
                break;
        }
    };

    const onSearch = (filters) => {
        setSearchParams(filters);
        setIsUpdateNeeded(true);
        setFilterModal(false);
    };

    const clearFilters = () => {
        setSearchParams({});
        setIsUpdateNeeded(true);
    };

    return (
        <div>
            <div className="content-above">
                <b>Game Data List <FontAwesomeIcon icon={faNoteSticky}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add game data
                </button>
                <button className="filter-button" type="button" onClick={() => setFilterModal(true)}>
                    <FontAwesomeIcon icon={faSearch} size="lg"/>
                </button>
                <button className="clear-button" type="button" onClick={clearFilters}>
                    <FontAwesomeIcon icon={faTimes} size="lg"/>
                </button>
            </div>
            <Modal
                isOpen={isCreateFormVisible}
                onRequestClose={() => setCreateFormVisible(false)}
                contentLabel="Add new Game Data"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <GameDataForm onAdd={() => onConfirmPressed('add')} onCancel={() => onCancelPressed('add')}/>
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
                <FilterGameDataForm onFilter={onSearch} onCancel={() => onCancelPressed('filter')}
                                    params={searchParams}/>
            </Modal>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Game ID</th>
                        <th>Level</th>
                        <th>Playtime (HRS)</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {gameData.map((data) => (
                        <tr key={data.id}>
                            <td>{data.user}</td>
                            <td>{data.game}</td>
                            <td>{data.level}</td>
                            <td>{data.playtime}</td>
                            <td>
                                <button className="delete" onClick={() => setDeletingId(data.id)}>
                                    Delete
                                </button>
                                <button onClick={() => setSelectedGameData(data)}>Update</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={deletingId}
                onRequestClose={() => setDeletingId(null)}
                contentLabel="Delete Game Data"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DeleteGameDataForm
                        dataId={deletingId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={selectedGameData}
                onRequestClose={() => setSelectedGameData(null)}
                contentLabel="Update Game Data"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <GameDataUpdateForm
                        data={selectedGameData}
                        onEdit={() => onConfirmPressed('update')}
                        onCancel={() => onCancelPressed('update')}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default UserGameDataList;
