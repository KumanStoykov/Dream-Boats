import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faEnvelope, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

import Slideshow from '../../ui/Slider/Slider';

import styles from './DetailsCard.module.css';


const DetailsCard = ({ boat }) => {


    return (
        <section className={styles.details}>
            <div className={styles['container-details']}>
                <div className={styles.card}>
                    <div className={styles['product-imgs']}>
                        <div className={styles['img-display']}>
                            <Slideshow imgs={boat.image.map(x => x.url)} />
                        </div>
                    </div>

                    <div className={styles['product-content']}>
                        <h2 className={styles['product-title']}>{boat.make}</h2>
                        <a href="/" className={styles['product-link']}><FontAwesomeIcon icon={faEye} /></a>

                        <div className={styles['product-price']}>
                            <p className={styles['new-price']}>Price: <span>${boat.price}</span></p>
                        </div>
                        <div className={styles['product-detail']}>
                            <h2>About This Boat: </h2>
                            <p>{boat.description}</p>
                            <ul>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Model: <span>{boat.model}</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Year: <span>{boat.year}</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Condition: <span>{boat.condition}</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Type: <span>{boat.type}</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Length: <span>{boat.length} m.</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Category: <span>{boat.category}</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Engine Make: <span>{boat.engineMake}</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Fuel type: <span>{boat.fuel}</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Hull Material: <span>{boat.hullMaterial}</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Location: <span>{boat.location}</span></li>
                            </ul>
                        </div>
                        <div className={styles['purchase-info']}>
                            <button type="submit" className={'btn-gradient'}>
                                Bay <FontAwesomeIcon className={'dots'} icon={faEllipsisH} />
                            </button>
                            <button type="submit" className={'btn-gradient'}>
                                Contact <FontAwesomeIcon className={styles.message} icon={faEnvelope} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailsCard;