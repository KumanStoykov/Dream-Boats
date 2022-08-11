import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../../hooks/useFetch';
import { authStoreActions } from '../../../store/authStore';
import { boatStoreActions } from '../../../store/boatStore';
import { modalStoreActions } from '../../../store/modalStore';
import { watchStoreActions } from '../../../store/watchStore';
import userService from '../../../services/userService';
import boatService from '../../../services/boatService';

import Modal from '../Modal/Modal';

import styles from './DeleteModal.module.css';
import Spinner from '../Spinner/Spinner';


const DeleteModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, requester } = useFetch();
    const user = useSelector(state => state.auth.userData);
    const boat = useSelector(state => state.allBoats.boat);

    const modalState = useSelector(state => state.modal);

    const responseDataDelete = (data) => {
        let message = '';
        if (modalState.model === 'user') {
            message = `Deleted your profile`;
            dispatch(authStoreActions.logout());
        } else if (modalState.model === 'boat') {
            message = `Deleted ${data.boat.make} ${data.boat.model}`;
            dispatch(boatStoreActions.removeBoat());
            dispatch(watchStoreActions.removeWatched(data));
        }

        dispatch(modalStoreActions.close());
        dispatch(modalStoreActions.open({
            type: 'successful',
            model: '',
            message: message
        }));
    };

    const closeHandler = () => {
        dispatch(modalStoreActions.close());
    };

    const deleteHandler = () => {
        if (modalState.model === 'user') {
            requester(userService.deleteUser(user._id), responseDataDelete);
        } else if (modalState.model === 'boat') {
            requester(boatService.deleteBoat(boat._id), responseDataDelete);
        }
        navigate('/');
    };

    return (
        <div className={styles.frame}>
            {isLoading
                ? <Spinner size={'large'} />

                : <Modal>
                    <div className={styles.modal} >
                        <FontAwesomeIcon className={styles['icon-modal']} icon={faTrash} />
                        <p className={styles['p-modal']}>{modalState.message}</p>
                        <div className={styles['btn-group']}>
                            <button
                                onClick={deleteHandler}
                                disabled={isLoading}
                                className={`${styles['btn-modal']} ${styles['btn-modal-delete']}`}
                            >Yes, delete it!
                            </button>
                            <button onClick={closeHandler} className={`${styles['btn-modal']}`}>Cancel</button>
                        </div>
                    </div>
                </Modal>}
        </div>
    );
};

export default DeleteModal;