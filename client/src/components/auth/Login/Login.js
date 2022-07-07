import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authStoreActions } from '../../../store/authStore';
import useFetch from '../../../hooks/useFetch';
import userRequestOptions from '../../../services/userService';

import styles from './Login.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';



const Login = () => {  
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();

    const responseData = (dataResponse) => {
        dispatch(authStoreActions.login(dataResponse));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const {email, password} = Object.fromEntries(formData);

        requester(userRequestOptions.login(email,password), responseData);
        navigate('/');
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
                    <form className={styles['login-form']} onSubmit={submitHandler}>

                        <div className={styles['input-group']}>
                            <input 
                            type="email" 
                            className={styles.input} 
                            placeholder="Email" 
                            name={'email'}
                            disabled={isLoading}
                            />
                            <span className={styles.bar}></span>
                        </div>

                        <div className={styles['input-group']}>
                            <input 
                            type="password" 
                            className={styles.input}
                            placeholder="Password"
                            name={'password'}
                            disabled={isLoading} 
                            />
                            <span className={styles.bar}></span>
                        </div>

                        <div className={styles['input-group']}>
                            <p className={styles['register-now']}>Not registered yet? <Link to="/auth/register" >Register Now!</Link></p>
                        </div>

                        <button 
                            type="submit" 
                            className={'btn-blue'}
                            disabled={isLoading}
                        >Login
                            <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                        </button>
                    </form>
                </div>
            </div>
        </section>

    );
}

export default Login;