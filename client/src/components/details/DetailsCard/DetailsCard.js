import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faEnvelope, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

import Slideshow from '../../ui/Slider/Slider';
import styles from './DetailsCard.module.css';


const DetailsCard = () => {

    return (
        <section className={styles.details}>
            <div className={`container`}>
                <div className={styles.card}>
                    {/* card left */}
                    <div className={styles['product-imgs']}>
                        <div className={styles['img-display']}>                          
                            <Slideshow imgs={['/images/luxury_1.jpg', '/images/luxury_2.jpg', '/images/luxury_3.jpg', '/images/luxury_14.jpg', ]} />
                        </div>
                    </div>
                    {/* card right */}
                    <div className={styles['product-content']}>
                        <h2 className={styles['product-title']}>Luxury yacht</h2>
                        <a href="/" className={styles['product-link']}><FontAwesomeIcon icon={faEye}/></a>
                     
                        <div className={styles['product-price']}>                           
                            <p className={styles['new-price']}>Price: <span>$249.000</span></p>
                        </div>
                        <div className={styles['product-detail']}>
                            <h2>About This Boat: </h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
                            <ul>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> length: <span>14.15 m.</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> year: <span>2012</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> fuel type: <span>Diesel</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> location: <span>Bari-Italy</span></li>
                                <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Category: <span>Yacht</span></li>
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