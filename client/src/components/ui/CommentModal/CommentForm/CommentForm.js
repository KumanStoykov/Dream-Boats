import { useState } from 'react';
import { useSelector } from 'react-redux';

import useFetch from '../../../../hooks/useFetch';
import useInput from '../../../../hooks/useInput';

import commentService from '../../../../services/commentService';
import userValidation from '../../../../validation/userValidation';

import Spinner from '../../../ui/Spinner/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentSlash, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import styles from './CommentForm.module.css';

const CommentForm = ({ commentFormHandler }) => {
    const { isLoading, requester } = useFetch();
    const [ratingError, setRatingError] = useState('');
    const user = useSelector(state => state.auth.userData);

    const nameInput = useInput(userValidation.nameIsLength);
    const commentInput = useInput(userValidation.textIsLength);

    const inputFieldsIsValid = nameInput.fieldIsValid && commentInput.fieldIsValid;

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

       requester(commentService.createComment(...formValue, user._id), commentFormHandler);
       nameInput.fieldReset();
       commentInput.fieldIsValid();
        
    }


    return (

        <div className={styles['form-container']}>
            <button type='button' onClick={commentFormHandler} className={`${styles['btn-icon']}`}>
                <span className={styles['icon-message']}><FontAwesomeIcon icon={faCommentSlash} /></span>
            </button>

            <form onSubmit={onSubmitHandler} className={styles.form}>
                <div className={styles['rating']}>
                    <input
                        type='radio'
                        id='rating-five'
                        name='rating'
                        value={'5'}
                    />
                    <label htmlFor='rating-five' />
                    <input
                        type='radio'
                        id='rating-four'
                        name='rating'
                        value={'4'}
                    />
                    <label htmlFor='rating-four'></label>
                    <input
                        type='radio'
                        id='rating-three'
                        name='rating'
                        value={'3'}
                    />
                    <label htmlFor='rating-three'></label>
                    <input
                        type='radio'
                        id='rating-two'
                        name='rating'
                        value={'2'}
                    />
                    <label htmlFor='rating-two'></label>
                    <input
                        type='radio'
                        id='rating-one'
                        name='rating'
                        value={'1'}
                    />
                    <label htmlFor='rating-one'></label>
                    {ratingError && <p className={styles['rating-error']}>Rating is required</p>}
                </div>
                <div>
                    <label htmlFor='name' className={styles.name}>Name:</label>
                    <input
                        type='text'
                        id='name'
                        name='rating'
                        className={styles['name-input']}
                        value={nameInput.value}
                        onChange={nameInput.onChange}
                        onBlur={nameInput.onBlur}
                    />
                    {nameInput.hasError && <p className={styles.error}>The name should be at least 2 characters long</p>}
                </div>
                <textarea
                    className={styles['post-input']}
                    cols={8}
                    rows={3}
                    name={'comment'}
                    value={commentInput.value}
                    onChange={commentInput.onChange}
                    onBlur={commentInput.onBlur}
                />
                {commentInput.hasError && <p className={styles.error}>The comment should be at least 10 characters long</p>}

                <button
                    className={`${!inputFieldsIsValid || isLoading ? 'no-drop-btn' : 'btn-blue'} ${styles['btn-post']}`}
                    disabled={!inputFieldsIsValid || isLoading}

                >Send
                    {isLoading
                        ? <Spinner size={'small'} />
                        : <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                    }
                </button>
            </form>
        </div>

    );
};

export default CommentForm;