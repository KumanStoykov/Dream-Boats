import { useDispatch } from 'react-redux';

import { switchToLogin } from '../../../store/switchAuthForm';

import styles from './Register.module.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';


const Register = () => {

    const dispatch = useDispatch();

    const clickHandler = (e) => {
        e.preventDefault();
        
        dispatch(switchToLogin())
    }

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
                    <form className={styles['register-form']}>
                        <div className={styles['input-group-wrap']}>
                            <div className={styles['input-group']}>
                                <input type="text" className={styles.input} placeholder="First name" />
                                <span className={styles.bar}></span>
                            </div>
                            <div className={styles['input-group']}>
                                <input type="text" className={styles.input} placeholder="Last name" />
                                <span className={styles.bar}></span>
                            </div>
                        </div>

                        <div className={styles['input-group']}>
                            <input type="email" className={styles.input} placeholder="Email" />
                            <span className={styles.bar}></span>
                        </div>

                        <div className={styles['input-group']}>
                            <input type="password" className={styles.input} placeholder="Password" />
                            <span className={styles.bar}></span>
                        </div>

                        <div className={styles['input-group']}>
                            <input type="password" className={styles.input} placeholder="Re-password" />
                            <span className={styles.bar}></span>
                        </div>

                        <div className={styles['input-group']}>
                            <p className={styles['register-now']}>Already have account? <a href="/auth/login" onClick={clickHandler}>Login Now!</a></p>
                        </div>

                        <button type="submit" className={'btn-blue'}>Register
                            <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Register;