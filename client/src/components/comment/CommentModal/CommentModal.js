import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import useFetch from '../../../hooks/useFetch';
import commentService from '../../../services/commentService';

import { modalStoreActions } from '../../../store/modalStore';
import { commentStoreActions } from '../../../store/commentStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faComment } from '@fortawesome/free-solid-svg-icons';

import CommentForm from '../CommentForm/CommentForm';
import CommentMessages from '../CommentMessages/CommentMessages';
import Spinner from '../../ui/Spinner/Spinner';

import styles from './CommentModal.module.css';

const CommentModal = () => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.allComments.comments);
    const user = useSelector(state => state.auth.userData);
    const formIsEdit = useSelector(state => state.allComments.formIsEdit);
    const formIsOpen = useSelector(state => state.allComments.formIsOpen);
    const { isLoading, requester } = useFetch();

    const hasForm = user?.email && formIsOpen;

    const responseData = useCallback((data) => {
        dispatch(commentStoreActions.addComments(data))
    }, [dispatch]);

    useEffect(() => {
        requester(commentService.getComments(), responseData);
    }, [requester, dispatch, responseData]);


    const closeFormHandler = () => {
        dispatch(modalStoreActions.close());
        dispatch(commentStoreActions.setEditForm(false));
        dispatch(commentStoreActions.setForm(false));

        if (comments.length !== 0) {
            dispatch(commentStoreActions.addComment({ comment: comments[0] }));
        }
    };

    const commentCloseHandler = () => {
        dispatch(commentStoreActions.setForm(true));
    }

    return (
        <div className={styles.frame}>
            {isLoading && <Spinner size={'large'} />}
            {!isLoading
                && <div className={styles.modal}>
                    <div className={`${styles['post-container']} ${hasForm && styles['post-container-with-form']}`}>
                        <button 
                            type='button' 
                            className={`${styles['btn-icon']}`}
                            onClick={closeFormHandler} 
                        >
                            <span className={styles['icon-message']}><FontAwesomeIcon icon={faXmark} /></span>
                        </button>
                        {user?.email
                            && !hasForm
                            && !formIsEdit
                            && <button 
                                    type='button' 
                                    className={`${styles['btn-icon']}`}
                                    onClick={commentCloseHandler} 
                                >
                                    <span className={styles['icon-form']}><FontAwesomeIcon icon={faComment} title='faComment'/></span>
                                </button>
                        }
                        {user?.email && formIsOpen && <CommentForm />}

                        <ul className={`${hasForm ? styles['post-messages'] : styles['only-messages']}`}>
                            {comments.map(x => <CommentMessages key={x._id} comment={x} />)}
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default CommentModal;