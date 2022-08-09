import { useDispatch } from 'react-redux';

import { modalStoreActions } from '../../../store/modalStore';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import styles from './Comments.module.css';

const Comments = () => {
    const dispatch = useDispatch();

    const commentFormHandler = () => {
        dispatch(modalStoreActions.open({
            type: 'comment',
            model: '',
            message: ''
        }));
    }

    return (
        <section className={styles.comment}>
            <div className={'container'}>
                <div className={styles['comment-content']}>
                    <div className={styles.discount}>
                        Comments 
                    </div>
                    <h5 className="hotel-name">Name for Comments creator</h5>
                    <div className={styles['hotel-rating']}>
                        <FontAwesomeIcon icon={faStar} className={styles.rating} />
                        <FontAwesomeIcon icon={faStar} className={styles.rating} />
                        <FontAwesomeIcon icon={faStar} className={styles.rating} />
                        <FontAwesomeIcon icon={faStar} className={styles.rating} />
                        <FontAwesomeIcon icon={faStarHalf} className={styles.rating} />
                    </div>
                    <p className={styles.paragraph}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores et porro quasi corrupti natus,
                        assumenda beatae tenetur nesciunt optio minima! Quibusdam nisi ipsum libero modi esse quidem
                        magni expedita possimus?
                    </p>
                    <button onClick={commentFormHandler} className={'btn-gradient'}>Read comments
                        <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH}/></span>
                    </button>
                </div>
            </div>
        </section>

    );
};

export default Comments;