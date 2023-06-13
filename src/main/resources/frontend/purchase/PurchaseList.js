import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PurchaseUpdateForm from './PurchaseUpdateForm';
import PurchaseForm from './PurchaseForm';
import Modal from 'react-modal';
import DeletePurchaseForm from './DeletePurchaseForm';
import FilterPurchaseForm from './FilterPurchaseForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes, faGamepad, faGear, faBagShopping} from '@fortawesome/free-solid-svg-icons';

const PurchaseList = () => {
    const [purchases, setPurchases] = useState([]);
    const [isUpdateNeeded, setIsUpdateNeeded] = useState(true);
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get('http://localhost:5667/api/v1/purchase/all', {params: searchParams});
                setPurchases(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        if (isUpdateNeeded)
            fetchPurchases();
        setIsUpdateNeeded(false);
    }, [isUpdateNeeded]);

    const onConfirmPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedPurchase(null);
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
    };

    const onCancelPressed = async (formType) => {
        switch (formType) {
            case 'update': {
                setSelectedPurchase(null);
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
                <b>Purchases List <FontAwesomeIcon icon={faBagShopping}/></b>
                <button className="add-button" type="button" onClick={() => setCreateFormVisible(true)}>
                    Add purchase
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
                contentLabel="Add a new Purchase"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <PurchaseForm onAdd={() => onConfirmPressed('add')} onCancel={() => onCancelPressed('add')}/>
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
                <FilterPurchaseForm onFilter={onSearch} onCancel={() => onCancelPressed('filter')}
                                    params={searchParams}/>
            </Modal>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sold Game ID</th>
                        <th>User ID</th>
                        <th>Time ID</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {purchases.map((purchase) => (
                        <tr key={purchase.id}>
                            <td>{purchase.id}</td>
                            <td>{purchase.soldGame}</td>
                            <td>{purchase.user}</td>
                            <td>{purchase.time}</td>
                            <td>
                                <button className="delete" onClick={() => setDeletingId(purchase.id)}>
                                    Delete
                                </button>
                                <button onClick={() => setSelectedPurchase(purchase)}>Update</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={deletingId}
                onRequestClose={() => setDeletingId(null)}
                contentLabel="Delete Purchase"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <DeletePurchaseForm
                        purchaseId={deletingId}
                        onCancel={() => onCancelPressed('delete')}
                        onConfirm={() => onConfirmPressed('delete')}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={selectedPurchase}
                onRequestClose={() => setSelectedPurchase(null)}
                contentLabel="Update Purchase"
                className="modal"
                overlayClassName="custom-modal-overlay"
                closeTimeoutMS={300}
            >
                <div className="modal-content">
                    <PurchaseUpdateForm
                        purchase={selectedPurchase}
                        onEdit={() => onConfirmPressed('update')}
                        onCancel={() => onCancelPressed('update')}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default PurchaseList;
