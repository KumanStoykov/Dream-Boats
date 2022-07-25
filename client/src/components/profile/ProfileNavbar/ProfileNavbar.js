import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faSailboat, faEnvelope, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

import styles from './ProfileNavbar.module.css';


const ProfileNavbar = () => {


    return (
        <div className={`${styles['nav-container']}`}>
            <nav className={styles['user-nav']}>           
                    <ul className={styles['container-profile-nav']}>
                        <li className={styles.box}>
                            <Link to="edit-profile" className={styles['user-nav-link']}>
                                <FontAwesomeIcon className={styles['user-profile-icon']} icon={faUserEdit} />
                            </Link>
                        </li>
                        <li className={styles.box}>
                            <Link to="sell-boat" className={styles['user-nav-link']}>
                                <FontAwesomeIcon className={styles['user-profile-icon']} icon={faSailboat} />
                            </Link>
                        </li>
                        <li className={styles.box}>
                            <Link to="message" className={styles['user-nav-link']}>
                                <FontAwesomeIcon className={`${styles['user-profile-icon']}`} icon={faEnvelope} />
                                <span className={styles['number-message']}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                            </Link>
                        </li>                   
                        <li className={styles.box}>
                            <Link to="watched" className={styles['user-nav-link']}>
                                <FontAwesomeIcon className={styles['user-profile-icon']} icon={faEye} />
                            </Link>
                        </li>
                    </ul>
            </nav>
        </div>
    );
};

export default ProfileNavbar;


