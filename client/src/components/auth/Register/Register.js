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

import styles from './Register.module.css';


const Register = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();


    const {
        value: firstNameValue,
        hasError: firstNameHasErrorValue,
        fieldIsValid: firstNameFieldIsValid,
        onChange: firstNameOnChange,
        onBlur: firstNameOnBlur,
        reset: firstNameReset
    } = useInput(userValidation.nameIsLength);
    const {
        value: lastNameValue,
        hasError: lastNameHasErrorValue,
        fieldIsValid: lastNameFieldIsValid,
        onChange: lastNameOnChange,
        onBlur: lastNameOnBlur,
        reset: lastNameReset
    } = useInput(userValidation.nameIsLength);
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
    const {
        value: repeatPasswordValue,
        hasError: repeatPasswordHasErrorValue,
        fieldIsValid: repeatPasswordFieldIsValid,
        onChange: repeatPasswordOnChange,
        onBlur: repeatPasswordOnBlur,
        reset: repeatPasswordReset
    } = useInput(userValidation.isEqual.bind(null, passwordValue));

    const inputFieldsIsValid = firstNameFieldIsValid
        && lastNameFieldIsValid
        && emailFieldIsValid
        && passwordFieldIsValid
        && repeatPasswordFieldIsValid;

    const responseData = (data) => {

        dispatch(authStoreActions.login(data));
        firstNameReset();
        lastNameReset();
        emailReset();
        passwordReset();
        repeatPasswordReset();
    };

    const submitHandler = (e) => {
        e.preventDefault();

        requester(userService.register(firstNameValue, lastNameValue, emailValue, passwordValue, repeatPasswordValue), responseData);

        if (typeof res === 'object') {
            navigate('/');
        } else {
            firstNameReset();
            lastNameReset();
            emailReset();
            passwordReset();
            repeatPasswordReset();
        }
    };

    return (
        <section className={styles.register}>
            <div className={'container'}>
                <h5 className={styles['section-head']}>
                    <span className={styles.heading}>Register</span>
                </h5>
                <div className={styles['register-content']}>
                    <div className={styles['boat-wrap']}>
                        <img src='/images/boat_register.png' alt='image.png' />
                    </div>
                    <div className={styles['container-form']}>
                        <h2 className={styles['title-form']}>Sign in</h2>

                        <form className={styles['register-form']} onSubmit={submitHandler}>
                            <div className={styles.field}>
                                <label htmlFor='firstName'>First Name</label>
                                <input
                                    type='text'
                                    id='firstName'
                                    name='firstName'
                                    value={firstNameValue}
                                    onChange={firstNameOnChange}
                                    onBlur={firstNameOnBlur}
                                />
                                {firstNameHasErrorValue && <p className={styles.error}>The last name should be at least 4 characters long</p>}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='lastName'>Last Name</label>
                                <input
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    value={lastNameValue}
                                    onChange={lastNameOnChange}
                                    onBlur={lastNameOnBlur}
                                />
                                {lastNameHasErrorValue && <p className={styles.error}>The last name should be at least 4 characters long</p>}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={emailValue}
                                    onChange={emailOnChange}
                                    onBlur={emailOnBlur}
                                />
                                {emailHasErrorValue && <p className={styles.error}>Email address is invalid</p>}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={passwordValue}
                                    onChange={passwordOnChange}
                                    onBlur={passwordOnBlur}
                                />
                                {passwordHasErrorValue && <p className={styles.error}>The password should be at least 5 characters long</p>}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='repeatPassword'>Re-password</label>
                                <input
                                    type='password'
                                    id='repeatPassword'
                                    name='repeatPassword'
                                    value={repeatPasswordValue}
                                    onChange={repeatPasswordOnChange}
                                    onBlur={repeatPasswordOnBlur}
                                />
                                {repeatPasswordHasErrorValue && <p className={styles.error}>The repeat password should be equal to the password</p>}
                            </div>
                            <button
                                disabled={!inputFieldsIsValid}
                                className={'btn-blue'}
                                type='submit'
                                >
                                Sign up
                                    {!inputFieldsIsValid && isLoading
                                        ? <Spinner size={'small'} />
                                        : <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                                    }
                            </button>
                            <div className={styles.more}>
                                <p >Don't have an account? <Link to='/auth/login'>Sign in</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;