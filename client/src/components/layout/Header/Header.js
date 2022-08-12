import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import UserNavigation from './UserNavigation/UserNavigation';
import GuestNavigation from './GuestNavigation/GuestNavigation';

import styles from './Header.module.css';


const Header = () => {
    const location = useLocation();
    const user = useSelector(state => state.auth.userData);
    const [navBarOpen, setNavBarOpen] = useState(false);


    const menuToggleHandler = (e) => {
        setNavBarOpen(state => !state);
    };

    useEffect(() => {
        setTimeout(() => {
            setNavBarOpen(false);
        }, 300);
    }, [location]);


    return (
        <header className={`${styles['header']} ${navBarOpen && styles['menu-open']}`}>
            <div className={'container'}>
                <nav className={styles.nav}>
                    <Link to='/' className={styles.logo}>
                        <img src='/images/logo.png' alt='logo.png' className={styles['logo-image']} />
                    </Link>
                    <div onClick={menuToggleHandler} className={styles[`hamburger-menu`]} >
                        <FontAwesomeIcon icon={faBars} className={styles.faBars} />
                        <FontAwesomeIcon icon={faTimes} className={styles.faTimes} />
                    </div>
                    <ul className={styles['nav-list']}>
                        <li className={styles['nav-item']}>
                            <Link to={`/boats-for-sale?page=1&sort=desc`} className={styles['nav-link']}>Boats for Sale</Link>
                        </li>
                        {user?.email
                            ? <UserNavigation
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