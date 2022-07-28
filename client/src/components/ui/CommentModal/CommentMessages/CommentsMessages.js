import styles from './CommentsMessages.module.css';

const CommentsMessages = ({message}) => {


    return (

        <li className={styles['item-container']}>
            <div className={styles['post-main']}>
                <span className={styles['post-title']}>Joe Doe</span>
                <span className={styles['post-time']}>12 hour ago</span>
            </div>
            <div className={styles['post-secondary']}>
                <p className={styles['post-body']}>{message}</p>
            </div>
        </li>


    );
};

export default CommentsMessages;