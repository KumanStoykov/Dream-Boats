import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import styles from './NewBoats.module.css';




const NewBoats = () => {


    return (
        <section className={styles.boats}>
            <div className={'container'}>
                <h5 className={styles['section-head']}>
                    <span className={styles.heading}>New Boats</span>
                    <span className={styles['sub-heading']}>Our explore Boats</span>
                </h5>
                <div className='grid'>
                    <div className={`grid-item ${styles['featured-boats']}`}>
                        <img src="./images/motor_1.jpg" alt="image.jpg" className={styles['boat-image']} />
                        <h5 className={styles['boat-name']}>Astro boat</h5>
                        <span className={styles['boat-price']}>87,340$</span>                    
                        <NavLink to={'/details'} className={`btn-gradient  ${styles['btn-down']}`}>Show offer
                            <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                        </NavLink>
                    </div>
                    <div className={`grid-item ${styles['featured-boats']}`}>
                        <img src="./images/luxury_2.jpg" alt="image.jpg" className={styles['boat-image']} />
                        <h5 className={styles['boat-name']}>Enchanted Garden</h5>
                        <span className={styles['boat-price']}>87,340$</span>                        
                        <NavLink to={'/details'} className={`btn-gradient  ${styles['btn-down']}`}>Show offer
                            <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                        </NavLink>
                    </div>
                    <div className={`grid-item ${styles['featured-boats']}`}>
                        <img src="./images/sail_1.jpg" alt="image.jpg" className={styles['boat-image']} />
                        <h5 className={styles['boat-name']}>The Paradise</h5>
                        <span className={styles['boat-price']}>87,340$</span>                       
                        <NavLink to={'/details'} className={`btn-gradient  ${styles['btn-down']}`}>Show offer
                            <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                        </NavLink>

                    </div>
                </div>
            </div>
        </section>

    );

};

export default NewBoats;