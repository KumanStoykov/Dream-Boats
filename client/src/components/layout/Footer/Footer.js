import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookSquare, faInstagram, faPinterest, faGoogle } from '@fortawesome/free-brands-svg-icons';


import styles from './Footer.module.css';




const Footer = () => {


    return (
        <footer className={styles.footer}>
            <div className={'container'}>
                <div className={styles['footer-content']}>
                    <div className={styles['footer-content-about']}>
                        <Link to='/' className={styles.logo}>
                            <img className={styles['logo-image']} src='/images/logo.png' alt='logo.png' />
                        </Link>
                        <ul className={styles['about-section']} >
                            <li><Link className={styles['about-section-item']} to='/about'>About us</Link></li>
                            <li><Link className={styles['about-section-item']} to='/contact'>Contact</Link></li>
                            <li><Link className={styles['about-section-item']} to='/terms-and-condition'>Terms and Conditions</Link></li>
                        </ul>
                    </div>

                    <div className={styles['social-media-wrap']}>
                        <h4 className={styles['footer-heading']}>Follow us</h4>
                        <div className={styles['social-media']}>
                            <a href='https://www.facebook.com' className={styles['sm-link']}><FontAwesomeIcon icon={faFacebookSquare} /></a>
                            <a href='https://twitter.com' className={styles['sm-link']}><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href='https://www.instagram.com' className={styles['sm-link']}><FontAwesomeIcon icon={faInstagram} /></a>
                            <a href='https://www.pinterest.com' className={styles['sm-link']}><FontAwesomeIcon icon={faPinterest} /></a>
                            <a href='https://www.google.com' className={styles['sm-link']}><FontAwesomeIcon icon={faGoogle} /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['p-container']}>
                <p className={styles['end-paragraph']}>&copy;Education purpose only! No rights reserved!</p>

            </div>
        </footer>


    );

};

export default Footer;