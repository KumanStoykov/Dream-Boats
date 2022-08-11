import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { modalStoreActions } from '../../../store/modalStore';
import Modal from '../Modal/Modal';

import styles from './NotificationModal.module.css';


const NotificationModal = () => {
    const dispatch = useDispatch();
    const modalState = useSelector(state => state.modal);

    const isError = modalState.type === 'error';

    const closeHandler = () => {
        dispatch(modalStoreActions.close());
    }

    useEffect(() => {

        setTimeout(() => {
            dispatch(modalStoreActions.close());
        }, 5000);

    }, [dispatch]);

    return (
        <Modal>
            <div>
                <div className={`${styles.modal} ${modalState}`} >
                    <FontAwesomeIcon 
                        className={isError ? styles['icon-modal-error']: styles['icon-modal-successful']} 
                        icon={isError ? faCircleExclamation : faCheckCircle} />
                    <span className={styles['title-modal']}>{isError ? 'Oops...' : 'Successful'}</span>
                    <p className={styles['p-modal']}>{modalState.message}</p>
                    <div onClick={closeHandler} className={`${styles['btn-modal']} ${isError ? styles['error-btn'] : styles['successful-btn']}`}>Dismiss</div>
                </div>
            </div>
        </Modal>
    );
};

export default NotificationModal;