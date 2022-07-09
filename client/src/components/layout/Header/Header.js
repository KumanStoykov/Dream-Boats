import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../../hooks/useFetch';
import userRequestOptions from '../../../services/userService';
import { authStoreActions } from '../../../store/authStore';

import styles from './Header.module.css';


const Header = () => {
    const [navbarOpen, setNavBarOpen] = useState(false);
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { requester } = useFetch();


    const handleToggle = () => {
        setNavBarOpen(oldState => !oldState);
    };

    const logoutHandler = (e) =>{
        e.preventDefault();
        dispatch(authStoreActions.logout());
        requester(userRequestOptions.logout())
    } 

    const userNavigate = () => {
        return (
            <>
                <li className={styles['nav-item']}>
                    <Link to="/" className={styles['nav-link']}>Home</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link to="/about" className={styles['nav-link']}>About</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link to="/boats-catalog" className={styles['nav-link']}>Boats</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link to="/details" className={styles['nav-link']}>Details</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link to="/news" className={styles['nav-link']}>News</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link onClick={logoutHandler} to="/auth/logout" className={styles['nav-link']}><FontAwesomeIcon className={styles['logout-icon']} icon={faArrowRightFromBracket} /></Link>
                </li>
            </>
        )
    };

    const guestNavigate = () => {
        return (
            <>
                <li className={styles['nav-item']}>
                    <Link to="/" className={styles['nav-link']}>Home</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link to="/about" className={styles['nav-link']}>About</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link to="/boats-catalog" className={styles['nav-link']}>Boats</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link to="/news" className={styles['nav-link']}>News</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link to="/auth/login" className={styles['nav-link']}><span className={styles['icon-span']}>Log on</span><FontAwesomeIcon className={styles['logout-icon']} icon={faUser} /></Link>
                </li>

            </>
        )
    }

    return (
        <header onClick={handleToggle} className={`${styles['header']} ${navbarOpen === true && styles['menu-open']}`}>
            <div className={'container'}>
                <nav className={styles.nav}>
                    <Link to="/" className={styles.logo}>
                        <img src="/images/logo.png" alt="image.png" className={styles['logo-image']} />
                    </Link>
                    <div className={styles[`hamburger-menu`]} >
                        <FontAwesomeIcon icon={faBars} className={styles.faBars} />
                        <FontAwesomeIcon icon={faTimes} className={styles.faTimes} />
                    </div>
                    <ul className={styles['nav-list']}>
                        {user?.email
                            ? userNavigate()
                            : guestNavigate()
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;