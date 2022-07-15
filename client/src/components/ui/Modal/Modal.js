import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation} from '@fortawesome/free-solid-svg-icons';

import { modalStoreActions} from '../../../store/modalStore';

import styles from './Modal.module.css';

const Modal = ({
    errMessage,

}) => {
    const dispatch = useDispatch();
    const modalState = useSelector(state => state.modal);
    const closeHandler = () => {
        dispatch(modalStoreActions.close)
        // if(!modalState.isOpen) {
        //     dispatch(modalStoreActions.open);
        //     console.log(modalState)
        // } else {
        //     dispatch(modalStoreActions.close);
        // }
    }

    return (
        <div className={styles.frame}>
            <div className={`${styles.modal} ${false ? styles.hide : null}`} >
                <FontAwesomeIcon className={styles['icon-modal']} icon={faCircleExclamation}/>
                <span className={styles['title-modal']}>Oh snap!</span>
                <p className={styles['p-modal']}>{errMessage}</p>
                <div onClick={closeHandler} className={styles['btn-modal']}>Dismiss</div>
            </div>
        </div>
    );
};

export default Modal;