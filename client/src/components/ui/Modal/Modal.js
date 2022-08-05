import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';


import styles from './Modal.module.css';

export const Overlay = ({ closeHandler, children }) => {
    return <div className={styles.modal} onClick={closeHandler} >{children}</div>;
}

const Modal = ({ children }) => {
    const dispatch = useDispatch();
    const portal = document.getElementById('portal');
    const modalState = useSelector(state => state.modal);

    const closeHandler = () => {
        dispatch(modalState.close())
    };

    return (
        <>
            {modalState.isOpen && createPortal(<Overlay onClose={closeHandler}>{children}</Overlay>, portal)}
        </>
    );
};

export default Modal;