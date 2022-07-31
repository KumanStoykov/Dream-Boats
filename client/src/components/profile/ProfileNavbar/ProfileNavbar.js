import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSailboat, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

import styles from './ProfileNavbar.module.css';


const ProfileNavbar = () => {
    const user = useSelector(state => state.auth.userData);
    


    return (
        <div className={`${styles['nav-container']}`}>
            <nav className={styles['user-nav']}>           
                    <ul className={styles['container-profile-nav']}>
                        <li className={styles.box}>
                            <Link to={`/profile/${user._id}`} className={styles['user-nav-link']}>
                                <FontAwesomeIcon className={styles['user-profile-icon']} icon={faUser} />
                            </Link>
                        </li>
                        <li className={styles.box}>
                            <Link to={`/profile/${user._id}/sell-boat`} className={styles['user-nav-link']}>
                                <FontAwesomeIcon className={styles['user-profile-icon']} icon={faSailboat} />
                                <FontAwesomeIcon className={styles['pen-icon']} icon={faPlus} />
                            </Link>
                        </li>
                        <li className={styles.box}>
                            <Link to={`/profile/owner-boats?whereId=${user._id}&sort=desc`} className={styles['user-nav-link']}>
                                <FontAwesomeIcon className={styles['user-profile-icon']} icon={faSailboat} />
                            </Link>
                        </li>                                       
                        <li className={styles.box}>
                            <Link to={`profile/${user._id}/watched`} className={styles['user-nav-link']}>
                                <FontAwesomeIcon className={styles['user-profile-icon']} icon={faEye} />
                            </Link>
                        </li>
                    </ul>
            </nav>
        </div>
    );
};

export default ProfileNavbar;


