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


    const firstNameInput = useInput(userValidation.nameIsLength);
    const lastNameInput = useInput(userValidation.nameIsLength);
    const emailInput = useInput(userValidation.emailIsValid);
    const phoneInput = useInput(userValidation.isPhone);
    const passwordInput = useInput(userValidation.passwordIsLength);
    const repeatPasswordInput = useInput(userValidation.isEqual.bind(null, passwordInput.value));

    const inputFieldsIsValid = firstNameInput.fieldIsValid
        && lastNameInput.fieldIsValid
        && emailInput.fieldIsValid
        && phoneInput.fieldIsValid
        && passwordInput.fieldIsValid
        && repeatPasswordInput.fieldIsValid;

    const responseData = (data) => {

        dispatch(authStoreActions.login(data));

        firstNameInput.fieldReset();
        lastNameInput.fieldReset();
        emailInput.fieldReset();
        phoneInput.fieldReset();
        passwordInput.fieldReset();
        repeatPasswordInput.fieldReset();
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formValue = [
            firstNameInput.value,
            lastNameInput.value,
            emailInput.value,
            phoneInput.value,
            passwordInput.value,
            repeatPasswordInput.value
        ];

        const res = await requester(userService.register(...formValue), responseData);

        if (res?.userData) {
            navigate('/');
        } else {
            passwordInput.fieldReset();
            repeatPasswordInput.fieldReset();
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
                                    data-testid='firstName'
                                    className={`${styles['input-field']} ${firstNameInput.hasError && 'error-input-field'}`}
                                    value={firstNameInput.value}
                                    onChange={firstNameInput.onChange}
                                    onBlur={firstNameInput.onBlur}
                                />
                                {firstNameInput.hasError && <p className={styles.error}>The first name should be at least 2 characters long</p>}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='lastName'>Last Name</label>
                                <input
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    data-testid='lastName'
                                    className={`${styles['input-field']} ${lastNameInput.hasError && 'error-input-field'}`}
                                    value={lastNameInput.value}
                                    onChange={lastNameInput.onChange}
                                    onBlur={lastNameInput.onBlur}
                                />
                                {lastNameInput.hasError && <p className={styles.error}>The last name should be at least 2 characters long</p>}
                            </div>
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
                                {emailInput.hasError && <p className={styles.error}>Please entry a valid email address</p>}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='phone'>Phone</label>
                                <input
                                    type='phone'
                                    id='phone'
                                    name='phone'
                                    data-testid='phone'
                                    className={`${styles['input-field']} ${phoneInput.hasError && 'error-input-field'}`}
                                    value={phoneInput.value}
                                    onChange={phoneInput.onChange}
                                    onBlur={phoneInput.onBlur}
                                />
                                {phoneInput.hasError && <p className={styles.error}>Please entry a valid phone number</p>}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    data-testid='password'
                                    className={`${styles['input-field']} ${passwordInput.hasError && 'error-input-field'}`}
                                    value={passwordInput.value}
                                    onChange={passwordInput.onChange}
                                    onBlur={passwordInput.onBlur}
                                />
                                {passwordInput.hasError && <p className={styles.error}>Password should be at last 5 character</p>}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='repeatPassword'>Re-password</label>
                                <input
                                    type='password'
                                    id='repeatPassword'
                                    name='repeatPassword'
                                    data-testid='repeatPassword'
                                    className={`${styles['input-field']} ${repeatPasswordInput.hasError && 'error-input-field'}`}
                                    value={repeatPasswordInput.value}
                                    onChange={repeatPasswordInput.onChange}
                                    onBlur={repeatPasswordInput.onBlur}
                                />
                                {repeatPasswordInput.hasError && <p className={styles.error}>The repeat password should be equal to the password</p>}
                            </div>
                            <button
                                className={!inputFieldsIsValid || isLoading ? 'no-drop-btn' : 'btn-blue'}
                                disabled={!inputFieldsIsValid || isLoading}
                                data-testid='singUpBtn'
                            >Sign up
                                {isLoading
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