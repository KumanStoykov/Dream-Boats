import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const BoatsCard = () => {


    return (
        <div className={classNames(styles['grid-item'], styles['featured-boats'])}>
            <img src="./images/motor_1.jpg" alt="image.jpg" className={styles['boat-image']} />
            <h5 className={styles['boat-name']}>Astro boat</h5>
            <span className={styles['boat-price']}>87,340$</span>
            <a href="#" className={'btn-gradient'}>View characteristics
                <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
            </a>
        </div>
    );
};

export default BoatsCard;