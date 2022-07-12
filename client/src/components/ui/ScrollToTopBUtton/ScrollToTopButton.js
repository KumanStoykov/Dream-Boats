import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';

import styles from './ScrollToTopButton.module.css';

const ScrollToTopButton = () => {
    const [showBtn, setShowBtn] = useState(false);

    const scrollHandler = () => {
        if(window.scrollY > 100) {
            setShowBtn(true);
        } else {
            setShowBtn(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        }

    }, []);

    const scrollToTopHandler = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>

            {showBtn &&
                <div onClick={scrollToTopHandler} className={styles['scroll-to-top']}>
                    <FontAwesomeIcon icon={faAnglesUp} className={styles['scroll-btn-icon']}/>
                </div>
            }
        </>
    );
}

export default ScrollToTopButton;