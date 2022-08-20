import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetch from '../../../hooks/useFetch';
import useInput from '../../../hooks/useInput';

import { commentStoreActions } from '../../../store/commentStore';

import commentService from '../../../services/commentService';
import userValidation from '../../../validation/userValidation';

import Spinner from '../../ui/Spinner/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentSlash, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import styles from './CommentForm.module.css';

const CommentForm = ({ setIsEdit }) => {
    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();
    const [ratingError, setRatingError] = useState('');

    const user = useSelector(state => state.auth.userData);
    const comment = useSelector(state => state.allComments.comment)
    const formIsEdit = useSelector(state => state.allComments.formIsEdit);
    const formIsOpen = useSelector(state => state.allComments.formIsOpen);


    const nameInput = useInput(userValidation.nameIsLength);
    const commentInput = useInput(userValidation.textIsLength);

    const inputFieldsIsValid = nameInput.fieldIsValid && commentInput.fieldIsValid;

    const responseData = (data) => {
        dispatch(commentStoreActions.updateComments(data));

        dispatch(commentStoreActions.addComment(data));

        commentCloseHandler();
    };

    useEffect(() => {
        if (formIsEdit) {
            nameInput.setValue(comment.name);
            commentInput.setValue(comment.comment)
        }
    }, [requester, formIsEdit]);


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const rating = form.get('rating');

        if (!rating) {
            setRatingError('Rating is required')
            return;
        }

        const formValue = [
            nameInput.value,
            commentInput.value,
            rating
        ];
        if (formIsEdit) {
            await requester(commentService.editComment(...formValue, comment._id), responseData);

        } else {

            await requester(commentService.createComment(...formValue, user._id), responseData);
        }

        nameInput.fieldReset();
        commentInput.fieldReset();
    };

    const commentCloseHandler = () => {
        if (formIsEdit) {
            setIsEdit(false);
            dispatch(commentStoreActions.setEditForm(false));
            dispatch(commentStoreActions.setForm(false));
        } else if (!formIsEdit && !formIsOpen) {
            dispatch(commentStoreActions.setForm(true));
        } else {
            dispatch(commentStoreActions.setForm(false));

        }
    }

    return (

        <div className={styles['form-container']}>
            <button type='button' onClick={commentCloseHandler} className={`${styles['btn-icon']}`}>
                <span className={styles['icon-message']}><FontAwesomeIcon icon={faCommentSlash} /></span>
            </button>


            <form onSubmit={onSubmitHandler} className={styles.form}>
                <div className={styles['rating']}>
                    <input
                        type='radio'
                        id='rating-five'
                        name='rating'
                        value={'5'}
                        data-testid='rating'
                        defaultChecked={formIsEdit ? comment.rating === 5 : ''}
                    />
                    <label htmlFor='rating-five' />
                    <input
                        type='radio'
                        id='rating-four'
                        name='rating'
                        value={'4'}
                        defaultChecked={formIsEdit ? comment.rating === 4 : ''}
                    />
                    <label htmlFor='rating-four'></label>
                    <input
                        type='radio'
                        id='rating-three'
                        name='rating'
                        value={'3'}
                        defaultChecked={formIsEdit ? comment.rating === 3 : ''}
                    />
                    <label htmlFor='rating-three'></label>
                    <input
                        type='radio'
                        id='rating-two'
                        name='rating'
                        value={'2'}
                        defaultChecked={formIsEdit ? comment.rating === 2 : ''}
                    />
                    <label htmlFor='rating-two'></label>
                    <input
                        type='radio'
                        id='rating-one'
                        name='rating'
                        value={'1'}
                        defaultChecked={formIsEdit ? comment.rating === 1 : ''}
                    />
                    <label htmlFor='rating-one'></label>
                    {ratingError && <p className={styles['rating-error']}>Rating is required!</p>}
                </div>
                <div>
                    <label htmlFor='name' className={styles.name}>Name:</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        data-testid='name'
                        className={styles['name-input']}
                        value={nameInput.value}
                        onChange={nameInput.onChange}
                        onBlur={nameInput.onBlur}
                    />
                    {nameInput.hasError && <p className={styles.error}>The name should be at least 2 characters long!</p>}
                </div>
                <textarea
                    className={styles['post-input']}
                    cols={8}
                    rows={3}
                    name='comment'
                    data-testid='comment'
                    value={commentInput.value}
                    onChange={commentInput.onChange}
                    onBlur={commentInput.onBlur}
                />
                {commentInput.hasError && <p className={styles.error}>The comment should be at least 10 characters long!</p>}

                <button
                    className={`${!inputFieldsIsValid || isLoading ? 'no-drop-btn' : 'btn-blue'} ${styles['btn-post']}`}
                    disabled={!inputFieldsIsValid || isLoading}

                >{formIsEdit ? 'Edit' : 'Send'}
                    {isLoading && inputFieldsIsValid
                        ? <Spinner size={'small'} />
                        : <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                    }
                </button>
            </form>
        </div>

    );
};

export default CommentForm;