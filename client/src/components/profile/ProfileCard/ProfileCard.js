import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authStoreActions } from '../../../store/authStore';
import useFetch from '../../../hooks/useFetch';
import useInput from '../../../hooks/useInput';
import userService from '../../../services/userService';
import userValidation from '../../../validation/userValidation';

import EditInput from './EditInput/EditInput';
import EditForm from './EditForm';
import Spinner from '../../ui/Spinner/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare, faPenSquare, faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './ProfileCard.module.css';


const ProfileCard = () => {
    const [isEdit, setIsEdit] = useState(false);

    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
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
        if(isEdit) {
            firstNameInput.setValue(user.firstName);
            lastNameInput.setValue(user.lastName);
            emailInput.setValue(user.email);
            phoneInput.setValue(user.phone);
        }
    }, [isEdit, requester]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const formValue = [
            firstNameInput.value,
            lastNameInput.value,
            emailInput.value,
            phoneInput.value,
            user._id
        ];

        await requester(userService.edit(...formValue), responseData);
    };

     const editHandler = () => {
        setIsEdit(true);
     }

    const cancelHandler = async () =>{        
        setIsEdit(false);
    }

    return (
        <div className='container'>
            <div className={`${styles.wrapper}`}>
                <div className={styles.left}>
                    <img src={'/images/user-card.jpg'} alt='image.png' width={200} />

                </div>
                <EditForm
                    onSubmitHandler={submitHandler}
                    isEdit={isEdit}
                    classStyles={styles.right}
                >
                    <div className={styles['btn-wrap']}>
                        {!isEdit &&     <button type='button' onClick={editHandler} className={` ${styles['btn-icon']}`}>
                                            <span className={styles['icon-user']}><FontAwesomeIcon icon={faUserPen} /></span>
                                        </button>
                                    
                        }
                        {isEdit &&  <button type='button' onClick={cancelHandler}  className={`${styles['btn-icon']}`}>
                                        <span className={styles['icon-user']}><FontAwesomeIcon icon={faXmark} /></span>
                                    </button>                        

                        }    
                    </div>                
                    <div className={styles.info}>
                        <h3 className={styles['section-title']}>Profile</h3>
                        <div className={styles['info-data']}>
                            <div className={styles.data}>
                                <h4 className={styles['title-data']}>First name:</h4>
                                {isEdit
                                    ? <EditInput
                                        nameInput={'firstName'}
                                        valueInput={firstNameInput.value}
                                        onChangeInput={firstNameInput.onChange}
                                        onBlurInput={firstNameInput.onBlur}
                                        hasErrorInput={firstNameInput.hasError}
                                        errorMessage={'The first name should be at least 2 characters long'}
                                    />
                                    : <p className={styles['paragraph-user']}>{user.firstName}</p>
                                }
                            </div>
                            <div className={styles.data}>
                                <h4 className={styles['title-data']}>Last name:</h4>
                                {isEdit
                                    ? <EditInput
                                        nameInput={'lastName'}
                                        valueInput={lastNameInput.value}
                                        onChangeInput={lastNameInput.onChange}
                                        onBlurInput={lastNameInput.onBlur}
                                        hasErrorInput={lastNameInput.hasError}
                                        errorMessage={'The last name should be at least 2 characters long'}
                                    />
                                    : <p className={styles['paragraph-user']}>{user.lastName}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.user}>
                        <h3 className={styles['section-title']}>Contacts</h3>
                        <div className={styles['user-data']}>
                            <div className={styles.data}>
                                <h4 className={styles['title-data']}>Email:</h4>
                                {isEdit
                                    ? <EditInput
                                        nameInput={'email'}
                                        valueInput={emailInput.value}
                                        onChangeInput={emailInput.onChange}
                                        onBlurInput={emailInput.onBlur}
                                        hasErrorInput={emailInput.hasError}
                                        errorMessage={'Email address is invalid'}
                                    />
                                    : <p className={styles['paragraph-user']}>{user.email}</p>
                                }
                            </div>
                            <div className={styles.data}>
                                <h4 className={styles['title-data']}>Phone:</h4>
                                {isEdit
                                    ? <EditInput
                                        nameInput={'phone'}
                                        valueInput={phoneInput.value}
                                        onChangeInput={phoneInput.onChange}
                                        onBlurInput={phoneInput.onBlur}
                                        hasErrorInput={phoneInput.hasError}
                                        errorMessage={'Phone number is invalid'}
                                    />
                                    : <p className={styles['paragraph-user']}>{user.phone}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles['btn-group']}>
                        {isEdit &&  <button 
                                        type='submit' 
                                        className={`btn-blue ${styles['btn-user-card']} ${!inputFieldsIsValid ? 'stop-btn' : ''}`}
                                        disabled={!inputFieldsIsValid}
                                    >Edit 
                                        {inputFieldsIsValid && isLoading
                                            ? <Spinner size={'small'} />
                                            : <span className={styles.icons}><FontAwesomeIcon icon={faPenSquare} /></span>
                                        }
                                    </button>
                        }
                        {!isEdit && <button type='submit' className={`btn-blue ${styles['btn-user-card']}`}>
                                        Delete <span className={styles.icons}><FontAwesomeIcon icon={faXmarkSquare} /></span>
                                    </button>
                        }                        
                    </div>
                </EditForm>
            </div>
        </div >
    );
};

export default ProfileCard