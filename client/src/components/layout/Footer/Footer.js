import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookSquare, faInstagram, faPinterest, faGoogle } from '@fortawesome/free-brands-svg-icons';


import styles from './Footer.module.css';




const Footer = () => {


    return (
        <footer className={styles.footer}>
            <div className={'container'}>
                <div className={styles['footer-content']}>
                    <div className={styles['footer-content-about']}>
                        <a href="index.html" className={styles.logo}>
                            <img className={styles['logo-image']} src="./images/logo.png" alt="logo.png" />
                        </a>
                        <ul className={styles['about-section']} >
                            <li><a className={styles['about-section-item']} href="#">About us</a></li>
                            <li><a className={styles['about-section-item']} href="#">Contact</a></li>
                            <li><a className={styles['about-section-item']}  href="#">Terms and Conditions</a></li>
                        </ul>                       
                    </div>

                    <div className={styles['social-media-wrap']}>
                        <h4 className={styles['footer-heading']}>Follow us</h4>
                        <div className={styles['social-media']}>
                            <a href="#" className={styles['sm-link']}><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="#" className={styles['sm-link']}><FontAwesomeIcon icon={faFacebookSquare} /></a>
                            <a href="#" className={styles['sm-link']}><FontAwesomeIcon icon={faInstagram} /></a>
                            <a href="#" className={styles['sm-link']}><FontAwesomeIcon icon={faPinterest} /></a>
                            <a href="#" className={styles['sm-link']}><FontAwesomeIcon icon={faGoogle} /></a>
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