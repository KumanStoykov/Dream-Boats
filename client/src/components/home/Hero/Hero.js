import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './Hero.module.css';

const Hero = () => {


    return (
        <div className={styles.hero}>
            <div className={'container'}>
                <div className={styles['main-heading']}>
                    <h1 className={styles.title}>Dream Boats</h1>
                    <h2 className={styles.subtitle}>Search your dream boat</h2>
                </div>
                <Link to='/boats-for-sale?page=1&sort=desc' className={'btn-gradient'}>Search now
                    <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                </Link>
            </div>
        </div>

    );
};

export default Hero;
