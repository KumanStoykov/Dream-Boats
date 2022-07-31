import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import { uiStoreActions } from '../../../store/uiStore';

import UserNavigate from './UserNavigate/UserNavigate';
import GuestNavigation from './GuestNavigate/GuestNavigate';

import styles from './Header.module.css';


const Header = () => {
    const dispatch = useDispatch();
    const navBarState = useSelector(state => state.ui.navBar);
    const user = useSelector(state => state.auth.userData);

    const menuToggleHandler = () => {
        dispatch(uiStoreActions.navBarToggle());
    };

    useEffect(() => {
        dispatch(uiStoreActions.navBarClose());
    }, [dispatch]);


    return (
        <header className={`${styles['header']} ${navBarState && styles['menu-open']}`}>
            <div className={'container'}>
                <nav className={styles.nav}>
                    <Link to='/' className={styles.logo}>
                        <img src='/images/logo.png' alt='image.png' className={styles['logo-image']} />
                    </Link>
                    <div onClick={menuToggleHandler} className={styles[`hamburger-menu`]} >
                        <FontAwesomeIcon icon={faBars} className={styles.faBars} />
                        <FontAwesomeIcon icon={faTimes} className={styles.faTimes} />
                    </div>
                    <ul className={styles['nav-list']}>
                        <li className={styles['nav-item']}>
                            <Link to='/news' className={styles['nav-link']}>News</Link>
                        </li>
                        <li className={styles['nav-item']}>
                            <Link to='/boats-for-sale' className={styles['nav-link']}>Boats for Sale</Link>
                        </li>
                        {user
                            ? <UserNavigate
                                styleNavLink={styles['nav-link']}
                                styleNavItem={styles['nav-link']}
                                styleIcon={styles['logout-icon']}
                            />
                            : <GuestNavigation
                                styleNavLink={styles['nav-link']}
                                styleNavItem={styles['nav-link']}
                                styleIcon={styles['logout-icon']}
                                styleSpanIcon={styles['icon-span']}
                            />
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;