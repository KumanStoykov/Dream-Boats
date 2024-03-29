import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import { authStoreActions } from '../../../store/authStore';
import useFetch from '../../../hooks/useFetch';
import useInput from '../../../hooks/useInput';
import userService from '../../../services/userService';
import userValidation from '../../../validation/userValidation';

import Spinner from '../../ui/Spinner/Spinner';
import styles from './Login.module.css';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();
    const [showPassword, setShowPassword] = useState(false);


    const emailInput = useInput(userValidation.emailIsValid);
    const passwordInput = useInput(userValidation.passwordIsLength);

    const inputFieldsIsValid = emailInput.fieldIsValid && passwordInput.fieldIsValid;

    const responseData = (data) => {
        dispatch(authStoreActions.login(data));

        emailInput.fieldReset();
        passwordInput.fieldReset();
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!inputFieldsIsValid) {
            return;
        }

        const formValue = [
            emailInput.value,
            passwordInput.value,
        ];

        const res = await requester(userService.login(...formValue), responseData);

        if (res?.userData) {
            navigate('/');
        } else {
            passwordInput.fieldReset()
        }
    };

    const showPasswordHandler = () => {
        setShowPassword(state => !state);
    };

    return (
        <section className={styles.login}>
            <div className={'container'}>
                <h5 className={styles['section-head']}>
                    <span className={styles.heading}>Login</span>
                </h5>
                <div className={styles['login-content']}>
                    <div className={styles['boat-wrap']}>
                        <img src='/images/boat_login.png' alt='boat.png' />
                    </div>
                    <div className={styles['container-form']}>
                        <h2 className={styles['title-form']}>Sign in</h2>
                        <form className={styles['login-form']} onSubmit={submitHandler}>
                            <div className={styles.field}>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    data-testid='email'
                                    className={`${styles['input-field']} ${emailInput.hasError && 'error-input-field'}`}
                                    value={emailInput.value}
                                    onChange={emailInput.onChange}
                                    onBlur={emailInput.onBlur}
                                />
                            </div>
                            {emailInput.hasError && <p className={styles.error}>Please entry a valid email address!</p>}
                            <div className={styles.field}>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    name='password'
                                    data-testid='password'
                                    className={`${styles['input-field']} ${passwordInput.hasError && 'error-input-field'}`}
                                    value={passwordInput.value}
                                    onChange={passwordInput.onChange}
                                    onBlur={passwordInput.onBlur}
                                />
                                <span onClick={showPasswordHandler} className={styles['show-password']}>
                                    {showPassword
                                        ? <FontAwesomeIcon icon={faEyeSlash} />
                                        : <FontAwesomeIcon icon={faEye} />
                                    }
                                </span>
                            </div>
                            {passwordInput.hasError && <p className={styles.error}>Password should be at last 5 character!</p>}
                            <button
                                disabled={!inputFieldsIsValid || isLoading}
                                className={!inputFieldsIsValid || isLoading ? 'no-drop-btn' : 'btn-blue'}
                            >Sign in
                                {isLoading
                                    ? <Spinner size={'small'} />
                                    : <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                                }
                            </button>
                            <div className={styles.more}>
                                <p >Don't have an account? <Link to='/auth/register'>Sign up</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;