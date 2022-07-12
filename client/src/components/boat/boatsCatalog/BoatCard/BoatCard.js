import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import styles from './BoatCard.module.css';

const BoatCard = ({
    boat
}) => {

    return (
        <li className={`grid-item ${styles['featured-boats']}`}>
            <img src="./images/sail_1.jpg" alt="image.jpg" className={styles['boat-image']} />
            <h5 className={styles['boat-name']}>{boat.model}</h5>
            <span className={styles['boat-price']}>{boat.price}$</span>
            <Link to={`/boat/details/${boat._id}`} className={`btn-gradient  ${styles['btn-down']}`}>Show offer
                <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
            </Link>
        </li>
    );
};

export default BoatCard;