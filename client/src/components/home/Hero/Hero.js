import styles from './Hero.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {


    return (
        <div className={styles.hero}>
            <div className={'container'}>
                <div className={styles['main-heading']}>
                    <h1 className={styles.title}>Discover</h1>
                    <h2 className={styles.subtitle}>Your dream boat</h2>
                </div>
                <a href="/offers" className={'btn-gradient'}>Explore now
                    <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                </a>
            </div>
        </div>

    );
};

export default Hero;