import styles from './CommentsMessages.module.css';

const CommentsMessages = ({ comment }) => {


    return (
        <li className={styles['item-container']}>
            <div className={styles['post-main']}>
                <span className={styles['post-title']}>{comment.name}</span>
                <span className={styles['post-time']}>{comment.date}</span>
                <div className={styles['rating-container']}>
                    <span id='1' className={`${styles.star} ${comment.rating >= 1 && styles['active-star']}`}>★</span>
                    <span id='2' className={`${styles.star} ${comment.rating >= 2 && styles['active-star']}`}>★</span>
                    <span id='3' className={`${styles.star} ${comment.rating >= 3 && styles['active-star']}`}>★</span>
                    <span id='4' className={`${styles.star} ${comment.rating >= 4 && styles['active-star']}`}>★</span>
                    <span id='5' className={`${styles.star} ${comment.rating === 5 && styles['active-star']}`}>★</span>
                </div>
            </div>
            <div className={styles['post-secondary']}>
                <p className={styles['post-body']}>{comment.comment}</p>
            </div>
        </li>
    );
};

export default CommentsMessages;