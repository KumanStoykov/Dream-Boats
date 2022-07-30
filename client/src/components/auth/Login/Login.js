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
            emailInput.fieldReset()
            passwordInput.fieldReset()
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
                                    value={emailInput.value}
                                    onChange={emailInput.onChange}
                                    onBlur={emailInput.onBlur}
                                />
                            </div>
                            {emailInput.hasError && <p className={styles.error}>Please entry your email address</p>}
                            <div className={styles.field}>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type="password"
                                    id='password'
                                    name='password'
                                    value={passwordInput.value}
                                    onChange={passwordInput.onChange}
                                    onBlur={passwordInput.onBlur}
                                />
                            </div>
                            {passwordInput.hasError && <p className={styles.error}>Please entry your password</p>}
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