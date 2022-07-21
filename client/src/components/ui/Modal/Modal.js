import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import { modalStoreActions } from '../../../store/modalStore';

import styles from './Modal.module.css';


export const Overlay = ({ onClose, children }) => {
    return <div className={styles.modal} onClick={onClose} >{children}</div>;
}


const Modal = ({ onClose, children }) => {
    const dispatch = useDispatch();
    const portal = document.getElementById('portal');
    const modalState = useSelector(state => state.modal);
   

    useEffect(() => {
        setTimeout(() => {
            dispatch(modalStoreActions.close());
        }, 5000);
    }, [dispatch]);


    return (
        <>
            {modalState.isOpen && createPortal(<Overlay onClose={onClose}>{children}</Overlay>, portal)}
        </>
    );
};

export default Modal;