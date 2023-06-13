import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GameUpdateForm from "./GameUpdateForm";
import GameForm from "./GameForm";
import Modal from "react-modal";
import DeleteGameForm from "./DeleteGameForm";
import FilterGameForm from "./FilterGameForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes, faGamepad, faGear, faStar} from "@fortawesome/free-solid-svg-icons";
import ExtraFilterUserForm from "../user/ExtraFilterUserForm";
import ExtraFilterGameForm from "./ExtraFilterGameForm";

const GameList = () => {
    const [games, setGames] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useState({});
    const [extraModal, setExtraModal] = useState(false);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/games/all',
                    {params: searchParams});
                setGames(response.data);
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
                <b>Games List <FontAwesomeIcon icon={faGamepad}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add game
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
                contentLabel="Add a new Game"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <GameForm onAdd={() => onConfirmPressed('add')}
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
                <FilterGameForm
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
                <ExtraFilterGameForm
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
                        <th>Genre</th>
                        <th>Score</th>
                        <th>Minimal Requirement ID</th>
                        <th>Recommended Requirement ID</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.id}</td>
                            <td>{game.gameTitle}</td>
                            <td>{game.genre}</td>
                            <td>{game.score}</td>
                            <td>{game.minReq}</td>
                            <td>{game.recReq}</td>
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
                contentLabel="Delete Game"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DeleteGameForm
                        gameId={deletingId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={selectedGame}
                onRequestClose={() => setSelectedGame(null)}
                contentLabel="Update Game"
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

export default GameList;
