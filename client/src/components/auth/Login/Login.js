import { useDispatch } from 'react-redux';

import { switchToRegister } from '../../../store/switchAuthForm';

import styles from './Login.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';



const Login = () => {  
    const dispatch = useDispatch();

    const clickHandler = (e) => {
        e.preventDefault();
        dispatch(switchToRegister())
    }

    return (
        <section className={styles.login}>
            <div className={'container'}>
                <h5 className={styles['section-head']}>
                    <span className={styles.heading}>Login</span>
                    <span className={styles['sub-heading']}>SING IN</span>
                </h5>
                <div className={styles['login-content']}>
                    <div className={styles['boat-wrap']}>
                        <img src="./images/boat_login.png" alt="image.png" />
                    </div>
                    <form className={styles['login-form']}>

                        <div className={styles['input-group']}>
                            <input type="email" className={styles.input} placeholder="Email" />
                            <span className={styles.bar}></span>
                        </div>

                        <div className={styles['input-group']}>
                            <input type="password" className={styles.input} placeholder="Password" />
                            <span className={styles.bar}></span>
                        </div>

                        <div className={styles['input-group']}>
                            <p className={styles['register-now']}>Not registered yet? <a href="/auth/register" onClick={clickHandler}>Register Now!</a></p>
                        </div>

                        <button type="submit" className={'btn-blue'}>Login
                            <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                        </button>
                    </form>
                </div>
            </div>
        </section>

    );
}

export default Login;