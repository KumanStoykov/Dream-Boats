import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';


import styles from './Modal.module.css';


const Modal = ({ children }) => {
    const portal = document.getElementById('portal');
    const modalState = useSelector(state => state.modal);


    return (
        <>
            {modalState.isOpen && createPortal(<div className={styles.modal} >{children}</div>, portal)}
        </>
    );
};

export default Modal;