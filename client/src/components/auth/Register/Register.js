import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authStoreActions } from '../../../store/authStore';
import useFetch from '../../../hooks/useFetch';
import userRequestOptions from '../../../services/userService';


import styles from './Register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../ui/Spinner/Spinner';


const Register = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();


    const responseData = (dataResponse) => {
        dispatch(authStoreActions.login(dataResponse));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { firstName, lastName, email, password, repeatPassword } = Object.fromEntries(formData);

        requester(userRequestOptions.register(firstName, lastName, email, password, repeatPassword), responseData);
        navigate('/');
    };
    
    return (
        <section className={styles.register}>
            <div className={'container'}>
                <h5 className={styles['section-head']}>
                    <span className={styles.heading}>Register</span>
                    <span className={styles['sub-heading']}>SING UP</span>
                </h5>
                <div className={styles['register-content']}>
                    <div className={styles['boat-wrap']}>
                        <img src="./images/boat_register.png" alt="image.png" />
                    </div>
                    <form className={styles['register-form']} onSubmit={submitHandler}>
                        <div className={styles['input-group-wrap']}>
                            <div className={styles['input-group']}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="First name"
                                    name='firstName'
                                    disabled={isLoading}
                                />
                                <span className={styles.bar}></span>
                            </div>
                            <div className={styles['input-group']}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Last name"
                                    name='lastName'
                                    disabled={isLoading}
                                />
                                <span className={styles.bar}></span>
                            </div>
                        </div>

                        <div className={styles['input-group']}>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="Email"
                                name='email'
                                disabled={isLoading}
                            />
                            <span className={styles.bar}></span>
                        </div>

                        <div className={styles['input-group']}>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Password"
                                name='password'
                                disabled={isLoading}
                            />
                            <span className={styles.bar}></span>
                        </div>

                        <div className={styles['input-group']}>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Re-password"
                                name='repeatPassword'
                                disabled={isLoading}
                            />
                            <span className={styles.bar}></span>
                        </div>

                        <div className={styles['input-group']}>
                            <p className={styles['register-now']}>Already have account? <Link to="/auth/login" >Login Now!</Link></p>
                        </div>

                        <button
                            type="submit"
                            className={'btn-blue'}
                            disabled={isLoading}
                        >Register
                            
                            <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Register;