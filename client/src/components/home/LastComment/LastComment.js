import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetch from '../../../hooks/useFetch';

import commentService from '../../../services/commentService';

import { modalStoreActions } from '../../../store/modalStore';
import { commentStoreActions } from '../../../store/commentStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import NoResultHeading from '../../ui/NoResultHeading/NoResultHeading';
import Spinner from '../../ui/Spinner/Spinner';

import styles from './LastComment.module.css';

const LastComment = () => {
    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();
    const comment = useSelector(state => state.allComments.comment);
    console.log(comment)
    const responseData = useCallback((data) => {
        dispatch(commentStoreActions.addComment(data));
    }, [dispatch]);

    useEffect(() => {
        requester(commentService.getLastComment(), responseData);
    }, [requester, dispatch, responseData]);

    const commentFormHandler = () => {
        dispatch(modalStoreActions.open({
            type: 'comment',
            model: '',
            message: ''
        }));
    }

    return (
        <section className={styles.comment}>
            {isLoading && <Spinner size={'large'} />}
            {comment === null && <NoResultHeading size={false} title={'No Comments yet'} />}
            <div className={'container'}>
                {!isLoading && comment !== null &&
                    <div className={styles['comment-content']}>
                        <div className={styles.discount}>
                            Comments
                        </div>
                        <h5 className={styles['user-name']}>{comment.name}</h5>
                        <div className={styles['rating-container']}>
                            <span id='1' className={`${styles.star} ${comment.rating >= 1 && styles['active-star']}`}>★</span>
                            <span id='2' className={`${styles.star} ${comment.rating >= 2 && styles['active-star']}`}>★</span>
                            <span id='3' className={`${styles.star} ${comment.rating >= 3 && styles['active-star']}`}>★</span>
                            <span id='4' className={`${styles.star} ${comment.rating >= 4 && styles['active-star']}`}>★</span>
                            <span id='5' className={`${styles.star} ${comment.rating === 5 && styles['active-star']}`}>★</span>
                        </div>
                        <p className={styles.paragraph}>{comment.comment}</p>
                        <button onClick={commentFormHandler} className={'btn-gradient'}>Read comments
                            <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                        </button>
                    </div>
                }
                {comment === null &&
                    <button onClick={commentFormHandler} className={`btn-blue ${styles['no-result-btn']}`}>Write comment
                        <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                    </button>
                }
            </div>
        </section>

    );
};

export default LastComment;