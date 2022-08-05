import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import { modalStoreActions } from '../../../store/modalStore';
import Modal from '../Modal/Modal';

import styles from './ErrorModal.module.css';


const ErrorModal = () => {
    const dispatch = useDispatch();
    const modalState = useSelector(state => state.modal);

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
                    <FontAwesomeIcon className={styles['icon-modal']} icon={faCircleExclamation} />
                    <span className={styles['title-modal']}>Oh snap!</span>
                    <p className={styles['p-modal']}>{modalState.message}</p>
                    <div onClick={closeHandler} className={styles['btn-modal']}>Dismiss</div>
                </div>
            </div>
        </Modal>
    );
};

export default ErrorModal;