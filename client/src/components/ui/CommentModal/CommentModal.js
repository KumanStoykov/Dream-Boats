import CommentForm from './CommentForm/CommentForm';
import CommentsMessages from './CommentMessages/CommentsMessages';

import styles from './CommentModal.module.css';

const CommentModal = () => {


    return (
        <div className={styles['post-container']}>
            <h1 className={styles['post-title']}>Our </h1>
            <CommentForm />
            <ul className={styles['post-messages']}>
                <CommentsMessages />
            </ul>
        </div>
    );
};

export default CommentModal;