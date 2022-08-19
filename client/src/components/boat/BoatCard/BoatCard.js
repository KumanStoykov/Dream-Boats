import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import styles from './BoatCard.module.css';

const BoatCard = ({
    boat,
    fancyBoarder
}) => {
    return (
        <li className={`grid-item ${styles['featured-boats']}`}>
            <img src={boat.image[0]?.url} alt="boat.jpg" className={`${styles['boat-image']} ${styles[fancyBoarder]}`} />
            <h5 className={styles['boat-make']}>{boat.make}</h5>
            <p className={styles['boat-model']}>{boat.model}</p>
            <span className={styles['boat-price']}>{boat.price.toLocaleString()}$</span>
            <Link to={`/boat/details/${boat._id}`} className={`btn-gradient  ${styles['btn-down']}`}>Show offer
                <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
            </Link>
        </li>
    );
};

export default BoatCard;