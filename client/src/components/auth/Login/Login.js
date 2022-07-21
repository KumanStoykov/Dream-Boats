import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { authStoreActions } from '../../../store/authStore';
import useFetch from '../../../hooks/useFetch';
import userService from '../../../services/userService';
import useInput from '../../../hooks/useInput';
import userValidation from '../../../validation/userValidation';

import Spinner from '../../ui/Spinner/Spinner';
import styles from './Login.module.css';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();


    const {
        value: emailValue,
        hasError: emailHasErrorValue,
        fieldIsValid: emailFieldIsValid,
        onChange: emailOnChange,
        onBlur: emailOnBlur,
        reset: emailReset
    } = useInput(userValidation.emailIsValid);

    const {
        value: passwordValue,
        hasError: passwordHasErrorValue,
        fieldIsValid: passwordFieldIsValid,
        onChange: passwordOnChange,
        onBlur: passwordOnBlur,
        reset: passwordReset
    } = useInput(userValidation.passwordIsLength);

    const inputFieldsIsValid = emailFieldIsValid && passwordFieldIsValid;

    const responseData = (data) => {
        dispatch(authStoreActions.login(data));
        emailReset();
        passwordReset();
    };


    const submitHandler = async (e) => {
        e.preventDefault();

        if (!inputFieldsIsValid) {
            return;
        }

        const res = await requester(userService.login(emailValue, passwordValue), responseData);
        
        if(typeof res === 'object') {
            navigate('/');
        } else {
            emailReset()
            passwordReset()
        }
    }


    return (
        <section className={styles.login}>
            <div className={'container'}>
                <h5 className={styles['section-head']}>
                    <span className={styles.heading}>Login</span>
                </h5>
                <div className={styles['login-content']}>
                    <div className={styles['boat-wrap']}>
                        <img src="/images/boat_login.png" alt="image.png" />
                    </div>
                    <div className={styles['container-form']}>
                        <h2 className={styles['title-form']}>Sign in</h2>
                        <form className={styles['login-form']} onSubmit={submitHandler}>
                            <div className={styles.field}>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type="email"
                                    id='email'
                                    name='email'
                                    value={emailValue}
                                    onChange={emailOnChange}
                                    onBlur={emailOnBlur}
                                />
                            </div>
                            {emailHasErrorValue && <p className={styles.error}>Please entry your email address</p>}
                            <div className={styles.field}>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type="password"
                                    id='password'
                                    name='password'
                                    value={passwordValue}
                                    onChange={passwordOnChange}
                                    onBlur={passwordOnBlur}
                                />
                            </div>
                            {passwordHasErrorValue && <p className={styles.error}>Please entry your password</p>}
                            <button
                                disabled={!inputFieldsIsValid}
                                className={'btn-blue'}
                                type="submit"
                                >
                                Sign in
                                    {!inputFieldsIsValid && isLoading
                                        ? <Spinner size={'small'} />
                                        : <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                                    }
                            </button>
                            <div className={styles.more}>
                                <p >Don't have an account? <Link to="/auth/register">Sign up</Link></p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>

    );
}

export default Login;