import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { commentStoreActions } from '../../../store/commentStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import CommentForm from '../CommentForm/CommentForm';
import CommentDelete from '../CommentDelete/CommentDelete';

import { dateFormate } from '../../../utils/dateFormatUtil';

import styles from './CommentMessages.module.css';

const CommentMessages = ({ comment }) => {
    const dispatch = useDispatch();
    const [isDelete, setIsDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const formIsEdit = useSelector(state => state.allComments.formIsEdit);
    const formIsOpen = useSelector(state => state.allComments.formIsOpen);
    const user = useSelector(state => state.auth.userData);

    const isOwner = user?._id === comment.creator;
    const hasOpenedForm = !formIsEdit && !formIsOpen;

    const editHandler = () => {
        setIsEdit(state => !state);
        dispatch(commentStoreActions.addComment({ comment }));
        dispatch(commentStoreActions.setForm(false));
        dispatch(commentStoreActions.setEditForm(true));
    };

    const openDeleteHandler = () => {
        setIsDelete(state => !state);
    };

    return (
        <li className={styles['item-container']}>

            {isDelete && <CommentDelete openDeleteHandler={openDeleteHandler} comment={comment} />}

            {isEdit && <CommentForm setIsEdit={setIsEdit} />}

            {!isDelete && !isEdit
                && <>
                    <div className={styles['post-main']}>
                        <span data-testid='name' className={styles['post-title']}>{comment.name}</span>
                        <span className={styles['post-time']}>{dateFormate(comment.createdAt)}</span>
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

                        {user?.email
                            && isOwner
                            && hasOpenedForm
                            && <div className={styles['btn-wrap']}>
                                <button
                                    className={`${styles['btn-icon']}`}
                                    onClick={openDeleteHandler}
                                >
                                    <span className={styles['icon-message']}><FontAwesomeIcon icon={faTrash} title='faTrash' /></span>
                                </button>
                                <button
                                    className={`${styles['btn-icon']}`}
                                    onClick={editHandler}
                                >
                                    <span className={styles['icon-message']}><FontAwesomeIcon icon={faEdit} title='faEdit' /></span>
                                </button>

                            </div>
                        }
                    </div>
                </>
            }
        </li>
    );
};

export default CommentMessages;