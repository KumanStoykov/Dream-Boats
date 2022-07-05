import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.css';



const Header = () => {
    const [navbarOpen, setNavBarOpen] = useState(false);

    const handleToggle = () => {
        setNavBarOpen(!true);
    };

    return (
        <header onClick={handleToggle} className={`${styles['header']} ${navbarOpen === true && styles['menu-open']}`}>
            <div className={'container'}>
                <nav className={styles.nav}>
                    <NavLink to="/" className={styles.logo}>
                        <img src="./images/logo.png" alt="image.png" className={styles['logo-image']} />
                    </NavLink>
                    <div className={styles[`hamburger-menu`]} >
                        <FontAwesomeIcon icon={faBars} className={styles.faBars} />
                        <FontAwesomeIcon icon={faTimes} className={styles.faTimes} />
                    </div>
                    <ul className={styles['nav-list']}>
                        <li className={styles['nav-item']}>
                            <NavLink to="/" className={styles['nav-link']}>Home</NavLink>
                        </li>
                        <li className={styles['nav-item']}>
                            <NavLink to="/about" className={styles['nav-link']}>About</NavLink>
                        </li>
                        <li className={styles['nav-item']}>
                            <NavLink to="/boats-catalog" className={styles['nav-link']}>Boats</NavLink>
                        </li>
                        <li className={styles['nav-item']}>
                            <NavLink to="/details" className={styles['nav-link']}>Details</NavLink>
                        </li>
                        <li className={styles['nav-item']}>
                            <NavLink to="/news" className={styles['nav-link']}>News</NavLink>
                        </li>
                        <li className={styles['nav-item']}>
                            <NavLink to="/auth" className={styles['nav-link']}>Log on</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;