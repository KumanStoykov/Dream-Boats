import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authStoreActions } from '../../../store/authStore';
import { modalStoreActions } from '../../../store/modalStore';
import useFetch from '../../../hooks/useFetch';
import useInput from '../../../hooks/useInput';
import userService from '../../../services/userService';
import userValidation from '../../../validation/userValidation';

import EditInput from './EditInput/EditInput';
import EditForm from './EditForm/EditForm';
import Spinner from '../../ui/Spinner/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare, faPenSquare, faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './ProfileCard.module.css';


const ProfileCard = () => {
    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false);

    const user = useSelector(state => state.auth.userData);
    const { isLoading, requester } = useFetch();


    const firstNameInput = useInput(userValidation.nameIsLength);
    const lastNameInput = useInput(userValidation.nameIsLength);
    const emailInput = useInput(userValidation.emailIsValid);
    const phoneInput = useInput(userValidation.isPhone);

    const inputFieldsIsValid = firstNameInput.fieldIsValid
        && lastNameInput.fieldIsValid
        && emailInput.fieldIsValid
        && phoneInput.fieldIsValid;

    const responseData = (data) => {

        dispatch(authStoreActions.login(data));

        firstNameInput.fieldReset();
        lastNameInput.fieldReset();
        emailInput.fieldReset();
        phoneInput.fieldReset();
        setIsEdit(false);
    };

    useEffect(() => {
        if (isEdit) {
            firstNameInput.setValue(user.firstName);
            lastNameInput.setValue(user.lastName);
            emailInput.setValue(user.email);
            phoneInput.setValue(user.phone);
        }
    }, [isEdit, requester]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formValue = [
            firstNameInput.value,
            lastNameInput.value,
            emailInput.value,
            phoneInput.value,
            user._id
        ];

        requester(userService.edit(...formValue), responseData);
    };

    const editHandler = () => {
        setIsEdit(true);
    }

    const cancelHandler = async () => {
        setIsEdit(false);
    }

    const deleteUserHandler = () => {
        dispatch(modalStoreActions.open({
            type: 'delete',
            model: 'user',
            message: 'Are you sure?'
        }));
    }

    return (
        <section className={'section-container'}>
            <div className='container'>
                <div className={`${styles.wrapper}`}>
                    <div className={styles.left}>
                        <img src={'/images/user-card.jpg'} alt='boat.png' width={200} />
                    </div>
                    <EditForm
                        onSubmitHandler={submitHandler}
                        isEdit={isEdit}
                        classStyles={styles.right}
                    >
                        <div className={styles['btn-wrap']}>
                            {!isEdit && <button type='button' onClick={editHandler} className={` ${styles['btn-icon']}`}>
                                <span className={styles['icon-user']}><FontAwesomeIcon icon={faUserPen} title='faUserPen' /></span>
                            </button>

                            }
                            {isEdit && <button type='button' onClick={cancelHandler} className={`${styles['btn-icon']}`}>
                                <span className={styles['icon-user']}><FontAwesomeIcon icon={faXmark} /></span>
                            </button>

                            }
                        </div>
                        <div className={styles.info}>
                            <h3 className={styles['section-title']}>Profile</h3>
                            <div className={styles['info-data']}>
                                <div className={styles.data}>
                                    <label htmlFor='firstName' className={styles['title-data']}>First name:</label>
                                    {isEdit
                                        ? <EditInput
                                            id={'firstName'}
                                            nameInput={'firstName'}
                                            valueInput={firstNameInput.value}
                                            onChangeInput={firstNameInput.onChange}
                                            onBlurInput={firstNameInput.onBlur}
                                            hasErrorInput={firstNameInput.hasError}
                                            errorMessage={'First name should be at least 2 characters long!'}
                                        />
                                        : <p
                                            className={styles['paragraph-user']}
                                            data-testid='firstName'
                                        >
                                            {user.firstName}
                                        </p>
                                    }
                                </div>
                                <div className={styles.data}>
                                    <label htmlFor='lastName' className={styles['title-data']}>Last name:</label>
                                    {isEdit
                                        ? <EditInput
                                            id={'lastName'}
                                            nameInput={'lastName'}
                                            valueInput={lastNameInput.value}
                                            onChangeInput={lastNameInput.onChange}
                                            onBlurInput={lastNameInput.onBlur}
                                            hasErrorInput={lastNameInput.hasError}
                                            errorMessage={'Last name should be at least 2 characters long!'}
                                        />
                                        : <p
                                            className={styles['paragraph-user']}
                                            data-testid='lastName'
                                        >
                                            {user.lastName}
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.user}>
                            <h3 className={styles['section-title']}>Contacts</h3>
                            <div className={styles['user-data']}>
                                <div className={styles.data}>
                                    <label htmlFor='email' className={styles['title-data']}>Email:</label>
                                    {isEdit
                                        ? <EditInput
                                            id={'email'}
                                            nameInput={'email'}
                                            valueInput={emailInput.value}
                                            onChangeInput={emailInput.onChange}
                                            onBlurInput={emailInput.onBlur}
                                            hasErrorInput={emailInput.hasError}
                                            errorMessage={'Email address is invalid!'}
                                        />
                                        : <p
                                            className={styles['paragraph-user']}
                                            data-testid='email'
                                        >
                                            {user.email}
                                        </p>
                                    }
                                </div>
                                <div className={styles.data}>
                                    <label htmlFor='phone' className={styles['title-data']}>Phone:</label>
                                    {isEdit
                                        ? <EditInput
                                            id={'phone'}
                                            nameInput={'phone'}
                                            valueInput={phoneInput.value}
                                            onChangeInput={phoneInput.onChange}
                                            onBlurInput={phoneInput.onBlur}
                                            hasErrorInput={phoneInput.hasError}
                                            errorMessage={'Phone number is invalid!'}
                                        />
                                        : <p
                                            className={styles['paragraph-user']}
                                            data-testid='phone'
                                        >
                                            {user.phone}
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles['btn-group']}>
                            {isEdit && <button
                                type='submit'
                                className={`${styles['btn-user-card']} ${!inputFieldsIsValid || isLoading ? 'no-drop-btn' : 'btn-blue'}`}
                                disabled={!inputFieldsIsValid || isLoading}
                            >Edit
                                {inputFieldsIsValid && isLoading
                                    ? <Spinner size={'small'} />
                                    : <span className={styles.icons}><FontAwesomeIcon icon={faPenSquare} /></span>
                                }
                            </button>
                            }
                            {!isEdit && <button
                                type='button'
                                onClick={deleteUserHandler}
                                className={`btn-blue ${styles['btn-user-card']}`}
                                disabled={isLoading}
                            >Delete
                                {isLoading
                                    ? <Spinner size={'small'} />
                                    : <span className={styles.icons}><FontAwesomeIcon icon={faXmarkSquare} /></span>
                                }
                            </button>
                            }
                        </div>
                    </EditForm>
                </div>
            </div >
        </section>
    );
};

export default ProfileCard