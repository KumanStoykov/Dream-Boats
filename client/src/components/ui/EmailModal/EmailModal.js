import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faXmark } from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../../hooks/useFetch';
import useInput from '../../../hooks/useInput';
import emailServices from '../../../services/emailService';
import userValidation from '../../../validation/userValidation';

import { modalStoreActions } from '../../../store/modalStore';

import Spinner from '../Spinner/Spinner';
import styles from './EmailModal.module.css';


const EmailModal = () => {
    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();
    const boat = useSelector(state => state.allBoats.boat);
    const nodeRef = useRef(null);



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

        const formValue = [
            nameInput.value,
            emailInput.value,
            phoneInput.value,
            messageInput.value,
        ]

        const emailSended = await requester(emailServices.sendMail(...formValue, boat.owner));

        if (emailSended) {
            dispatch(modalStoreActions.close());
            nameInput.fieldReset();
            phoneInput.fieldReset();
            emailInput.fieldReset();
            messageInput.fieldReset();
            dispatch(modalStoreActions.open({
                type: 'successful',
                model: '',
                message: 'We have sent your information directly to the seller.'
            }));
        }

    };

    const xMarkHandler = () => {
        dispatch(modalStoreActions.close());
    };

    const outsideHandler = (e) => {
        if (!nodeRef.current || nodeRef.current.contains(e.target)) {
            return;
        }
        dispatch(modalStoreActions.close());
    }

    return (
        <div className={styles.frame} onClick={outsideHandler}>
            {isLoading && <Spinner size={'large'} />}
            {!isLoading
                && <div className={styles.modal} >
                    <form onSubmit={submitHandler} className={`${styles['contact-form']}`} ref={nodeRef}>
                        <button type='button' onClick={xMarkHandler} className={`${styles['btn-icon']}`}>
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
                                rows={3}
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
                            disabled={!inputFieldsIsValid}
                            className={!inputFieldsIsValid || isLoading ? 'no-drop-btn' : 'btn-blue'}
                        >Send
                            {isLoading
                                ? <Spinner size={'small'} />
                                : <span className='dots'><FontAwesomeIcon icon={faEllipsisH} /></span>
                            }
                        </button>
                    </form>
                </div>
            }

        </div>
    );
}

export default EmailModal;