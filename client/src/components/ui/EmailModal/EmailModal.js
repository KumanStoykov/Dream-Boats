import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faXmark } from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../../hooks/useFetch';
import useInput from '../../../hooks/useInput';
import emailServices from '../../../services/emailService';
import userService from '../../../services/userService';
import userValidation from '../../../validation/userValidation';

import { modalStoreActions } from '../../../store/modalStore';

import Modal from '../Modal/Modal';

import Spinner from '../Spinner/Spinner';
import styles from './EmailModal.module.css';


const EmailModal = () => {
    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();
    const boat = useSelector(state => state.allBoats.boat);

    const nameInput = useInput(userValidation.isEmpty);
    const phoneInput = useInput(userValidation.isEmpty);
    const emailInput = useInput(userValidation.isEmpty);
    const messageInput = useInput(userValidation.isEmpty);

    const inputFieldsIsValid = nameInput.fieldIsValid
        && phoneInput.fieldIsValid
        && emailInput.fieldIsValid
        && messageInput.fieldIsValid;


    const submitHandler = async (e) => {
        e.preventDefault();

        if (!inputFieldsIsValid) {
            return;
        }

        const user = await requester(userService.getUserById(boat.owner));


        const formValue = [
            nameInput.value,
            emailInput.value,
            phoneInput.value,
            messageInput.value,
            user.user.email
        ]

        requester(emailServices.sendMail(...formValue));
    };

    const cancelHandler = () => {
        dispatch(modalStoreActions.close())
    };


    return (
        <div className={styles.frame}>
            {isLoading
                ? <Spinner size={'large'} />

                : <Modal>
                    <div className={styles.modal}>
                        <form onSubmit={submitHandler} className={`${styles['contact-form']} ${styles.form}`}>
                            <button type='button' onClick={cancelHandler} className={`${styles['btn-icon']}`}>
                                <span className={styles['icon-message']}><FontAwesomeIcon icon={faXmark} /></span>
                            </button>
                            <div className={styles['input-group-wrap']}>
                                <div className={styles['input-group']}>
                                    <input
                                        type='text'
                                        className={styles.input}
                                        placeholder='Name'
                                        name='name'
                                        value={nameInput.value}
                                        onChange={nameInput.onChange}
                                        onBlur={nameInput.onBlur}
                                    />
                                    <span className={styles.bar} />
                                    {nameInput.hasError && <p className={styles.error}>Field is required!</p>}
                                </div>
                                <div className={styles['input-group']}>
                                    <input
                                        type='text'
                                        className={styles.input}
                                        placeholder='Phone'
                                        name='phone'
                                        value={phoneInput.value}
                                        onChange={phoneInput.onChange}
                                        onBlur={phoneInput.onBlur}
                                    />
                                    <span className={styles.bar} />
                                    {phoneInput.hasError && <p className={styles.error}>Field is required!</p>}
                                </div>
                            </div>
                            <div className={styles['input-group']}>
                                <input
                                    type='email'
                                    className={styles.input}
                                    placeholder='E-mail'
                                    name='email'
                                    value={emailInput.value}
                                    onChange={emailInput.onChange}
                                    onBlur={emailInput.onBlur}
                                />
                                <span className={styles.bar} />
                                {emailInput.hasError && <p className={styles.error}>Field is required!</p>}
                            </div>
                            <div className={styles['input-group']}>
                                <textarea
                                    className={styles.input}
                                    cols={30}
                                    rows={5}
                                    placeholder='Message'
                                    name='message'
                                    value={messageInput.value}
                                    onChange={messageInput.onChange}
                                    onBlur={messageInput.onBlur}
                                />
                                <span className={styles.bar} />
                                {messageInput.hasError && <p className={styles.error}>Field is required!</p>}
                            </div>
                            <button
                                disabled={!inputFieldsIsValid || isLoading}
                                className={`btn-blue ${!inputFieldsIsValid || isLoading ? 'stop-btn' : ''}`}
                            >Send
                                {isLoading
                                    ? <Spinner size={'small'} />
                                    : <span className='dots'><FontAwesomeIcon icon={faEllipsisH} /></span>
                                }
                            </button>
                        </form>
                    </div>
                </Modal>
            }

        </div>
    );
}

export default EmailModal;