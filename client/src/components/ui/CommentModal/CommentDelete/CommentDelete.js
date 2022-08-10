import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetch from '../../../../hooks/useFetch';

import { commentStoreActions } from '../../../../store/commentStore';
import commentService from '../../../../services/commentService';

import styles from './CommentDelete.module.css';


const CommentDelete = ({openDeleteHandler, comment}) => {
    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();


    const responseData = (data) => {
        dispatch(commentStoreActions.removeComment(data._id));
    }
    
    const deleteHandler = () => {
        requester(commentService.deleteComment(comment._id), responseData);
        openDeleteHandler();
    };
    
    const closeHandler = () => {
        openDeleteHandler();    
    }

    return (
        <>
            <p className={styles['modal-p']}>You are sure?</p>
            <div className={styles['btn-group']}>
                <button
                    onClick={deleteHandler}
                    disabled={isLoading}
                    className={`${styles['btn-modal']} ${styles['btn-modal-delete']}`}
                >Delete
                </button>
                <button onClick={closeHandler} className={`${styles['btn-modal']}`}>Cancel</button>
            </div>
        </>
    );
};

export default CommentDelete;