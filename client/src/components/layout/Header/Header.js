import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faArrowRightFromBracket, faUserLock } from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../../hooks/useFetch';
import userRequestOptions from '../../../services/userService';
import { authStoreActions } from '../../../store/authStore';

import styles from './Header.module.css';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [navbarOpen, setNavBarOpen] = useState(false);
    const auth = useSelector(state => state.auth);
    const { requester } = useFetch();


    const menuToggleHandler = () => {
        setNavBarOpen(oldState => !oldState);
    };

    useEffect(() => {
        setNavBarOpen(false);
    }, [navigate]);

    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(authStoreActions.logout());
        requester(userRequestOptions.logout());
        navigate('/');
    };


    const userNavigate = () => {
        return (
            <>
                <li className={styles['nav-item']}>
                    <Link to="/profile" className={styles['nav-link']}>Profile</Link>
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
                    <Link to="/auth/login" className={styles['nav-link']}><span className={styles['icon-span']}>Log on</span><FontAwesomeIcon className={styles['logout-icon']} icon={faUserLock} /></Link>
                </li>

            </>
        )
    }

    return (
        <header className={`${styles['header']} ${navbarOpen && styles['menu-open']}`}>
            <div className={'container'}>
                <nav className={styles.nav}>
                    <Link to="/" className={styles.logo}>
                        <img src="/images/logo.png" alt="image.png" className={styles['logo-image']} />
                    </Link>
                    <div onClick={menuToggleHandler} className={styles[`hamburger-menu`]} >
                        <FontAwesomeIcon icon={faBars} className={styles.faBars} />
                        <FontAwesomeIcon icon={faTimes} className={styles.faTimes} />
                    </div>
                    <ul className={styles['nav-list']}>
                        <li className={styles['nav-item']}>
                            <Link to="/boats-for-sale" className={styles['nav-link']}>Boats for Sale</Link>
                        </li>
                        <li className={styles['nav-item']}>
                            <Link to="/profile/sell-boat" className={styles['nav-link']}>Sell my Boat</Link>
                        </li>
                        <li className={styles['nav-item']}>
                            <Link to="/news" className={styles['nav-link']}>News</Link>
                        </li>
                        {auth.userData
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