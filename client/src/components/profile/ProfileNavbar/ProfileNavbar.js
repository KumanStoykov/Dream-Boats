import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faSailboat, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

import styles from './ProfileNavbar.module.css';


const ProfileNavbar = () => {


    return (
        <div className={`${styles['nav-container']}`}>
            <nav className={styles['nav-horizontals']}>           
                <ul className={styles['container-profile-nav']}>
                    <li className={styles.box}>
                    <Link to="/boats-catalog" className={styles['nav-horizontals-link']}><FontAwesomeIcon className={styles['user-profile-icon']} icon={faUserEdit} /></Link>
                    </li>
                    <li className={styles.box}>
                    <Link to="/boats-catalog" className={styles['nav-horizontals-link']}><FontAwesomeIcon className={styles['user-profile-icon']} icon={faSailboat} /></Link>
                    </li>
                    <li className={styles.box}>
                    <Link to="/boats-catalog" className={styles['nav-horizontals-link']}><FontAwesomeIcon className={styles['user-profile-icon']} icon={faMoneyCheckDollar} /></Link>
                    </li>                   
                    <li className={styles.box}>
                    <Link to="/boats-catalog" className={styles['nav-horizontals-link']}><FontAwesomeIcon className={styles['user-profile-icon']} icon={faEye} /></Link>
                    </li>
                </ul>

            </nav>
        </div>
    );
};

export default ProfileNavbar;


