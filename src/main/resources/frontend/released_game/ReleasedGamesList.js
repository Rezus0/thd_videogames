import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GameUpdateForm from "./GameUpdateForm";
import ReleasedGameForm from "./ReleasedGameForm";
import Modal from "react-modal";
import ReleasedGameDeleteForm from "./ReleasedGameDeleteForm";
import FilterReleasedGameForm from "./FilterReleasedGameForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes, faGamepad, faGear} from "@fortawesome/free-solid-svg-icons";

const ReleasedGamesList = () => {
    const [releasedGames, setReleasedGames] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/released_games/all',
                    {params: searchParams});
                setReleasedGames(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        if (isUpdateNeeded)
            fetchGames();
        setIsUpdateNeeded(false);
    }, [isUpdateNeeded]);

    const onConfirmPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedGame(null);
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
                setSelectedGame(null);
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
                <b>Released Games List <FontAwesomeIcon icon={faGamepad}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add released game
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
                contentLabel="Add a new Released Game"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <ReleasedGameForm onAdd={() => onConfirmPressed('add')}
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
                <FilterReleasedGameForm
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
                        <th>Game ID</th>
                        <th>Publisher ID</th>
                        <th>Developer ID</th>
                        <th>Date ID</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {releasedGames.map((game) => (
                        <tr key={game.id}>
                            <td>{game.id}</td>
                            <td>{game.game}</td>
                            <td>{game.publisher}</td>
                            <td>{game.developer}</td>
                            <td>{game.date}</td>
                            <td>
                                <button className="delete" onClick={() => setDeletingId(game.id)}>Delete</button>
                                <button onClick={() => setSelectedGame(game)}>Update</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={deletingId}
                onRequestClose={() => setDeletingId(null)}
                contentLabel="Delete Released Game"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <ReleasedGameDeleteForm
                        gameId={deletingId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={selectedGame}
                onRequestClose={() => setSelectedGame(null)}
                contentLabel="Update Released Game"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content"><GameUpdateForm game={selectedGame}
                                                               onEdit={() => onConfirmPressed('update')}
                                                               onCancel={() => onCancelPressed('update')}/>
                </div>
            </Modal>
        </div>
    );
};

export default ReleasedGamesList;
