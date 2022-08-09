import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import useFetch from '../../../hooks/useFetch';
import useInput from '../../../hooks/useInput';
import commentService from '../../../services/commentService';

import { modalStoreActions } from '../../../store/modalStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faComment } from '@fortawesome/free-solid-svg-icons';

import Modal from '../Modal/Modal';
import CommentForm from './CommentForm/CommentForm';
import CommentsMessages from './CommentMessages/CommentsMessages';


import styles from './CommentModal.module.css';

const CommentModal = () => {
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);
    const [comments, setComments] = useState([]);
    const user = useSelector(state => state.auth.userData);
    const { isLoading, requester} = useFetch();

    const hasForm = user?.email && openForm;

    useEffect(() => {
        requester(commentService.getComments())
        .then(res => {
            setComments(res.comments);
        })
    }, [requester, dispatch]);


    const cancelHandler = () => {
        dispatch(modalStoreActions.close());
    };

    const commentFormHandler = () => {
        setOpenForm(state => !state);
    }

    return (
        <div className={styles.frame}>
            <Modal>
                <div className={styles.modal}>
                    <div className={`${styles['post-container']} ${hasForm && styles['post-container-with-form']}`}>
                        <button type='button' onClick={cancelHandler} className={`${styles['btn-icon']}`}>
                            <span className={styles['icon-message']}><FontAwesomeIcon icon={faXmark} /></span>
                        </button>
                            {!hasForm && user?.email && <button type='button' onClick={commentFormHandler} className={`${styles['btn-icon']}`}>
                                <span className={styles['icon-form']}><FontAwesomeIcon icon={faComment} /></span>
                            </button>
                            }                        
                        {user?.email && openForm && <CommentForm commentFormHandler={commentFormHandler}/>}
                        
                        <ul className={`${hasForm ? styles['post-messages'] : styles['only-messages']}`}>
                            {comments.map(x => <CommentsMessages key={x._id} comment={x}/>)}
                        </ul>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CommentModal;