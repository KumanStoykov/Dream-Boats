import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './Hero.module.css';

const Hero = () => {
    

    return (
        <div className={styles.hero}>
            <div className={'container'}>
                <div className={styles['main-heading']}>
                    <h1 className={styles.title}>Discover</h1>
                    <h2 className={styles.subtitle}>Your dream boat</h2>
                </div>
                <a href="/boats-catalog" className={'btn-gradient'}>Explore now                
                <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH}/></span>                                   
                </a>
            </div>
        </div>

    );
};

export default Hero;
