import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SoldGameUpdateForm from './SoldGameUpdateForm';
import SoldGameForm from './SoldGameForm';
import Modal from 'react-modal';
import DeleteSoldGameForm from './DeleteSoldGameForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes, faGamepad, faGear, faCoins} from '@fortawesome/free-solid-svg-icons';
import FilterSoldGameForm from "./FilterSoldGameForm";

const SoldGameList = () => {
    const [soldGames, setSoldGames] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [selectedSoldGame, setSelectedSoldGame] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        const fetchSoldGames = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/sold_games/all', {
                    params: searchParams,
                });
                setSoldGames(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        if (isUpdateNeeded)
            fetchSoldGames();
        setIsUpdateNeeded(false);
    }, [isUpdateNeeded]);

    const onConfirmPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedSoldGame(null);
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
                setSelectedSoldGame(null);
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
                <b>Sold Games List <FontAwesomeIcon icon={faCoins}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add sold game
                </button>
                <button className="filter-button" type="button" onClick={() => setFilterModal(true)}>
                    <FontAwesomeIcon icon={faSearch} size={'lg'}/>
                </button>
                <button className="clear-button" type="button" onClick={() => clearFilters()}>
                    <FontAwesomeIcon icon={faTimes} size={'lg'}/>
                </button>
            </div>
            <Modal
                isOpen={isCreateFormVisible}
                onRequestClose={() => setCreateFormVisible(false)}
                contentLabel="Add a new Sold Game"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <SoldGameForm onAdd={() => onConfirmPressed('add')} onCancel={() => onCancelPressed('add')}/>
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
                <FilterSoldGameForm onFilter={onSearch} onCancel={() => onCancelPressed('filter')}
                                    params={searchParams}/>
            </Modal>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Game ID</th>
                        <th>Store ID</th>
                        <th>Price ($)</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {soldGames.map((soldGame) => (
                        <tr key={soldGame.id}>
                            <td>{soldGame.id}</td>
                            <td>{soldGame.game}</td>
                            <td>{soldGame.store}</td>
                            <td>{soldGame.price}</td>
                            <td>
                                <button className="delete" onClick={() => setDeletingId(soldGame.id)}>
                                    Delete
                                </button>
                                <button onClick={() => setSelectedSoldGame(soldGame)}>Update</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={deletingId}
                onRequestClose={() => setDeletingId(null)}
                contentLabel="Delete Sold Game"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DeleteSoldGameForm
                        soldGameId={deletingId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={selectedSoldGame}
                onRequestClose={() => setSelectedSoldGame(null)}
                contentLabel="Update Sold Game"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <SoldGameUpdateForm
                        soldGame={selectedSoldGame}
                        onEdit={() => onConfirmPressed('update')}
                        onCancel={() => onCancelPressed('update')}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default SoldGameList;
