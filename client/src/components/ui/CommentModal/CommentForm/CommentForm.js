import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import styles from './CommentForm.module.css';

const CommentForm = () => {


    return (

        <div className={styles['form-container']}>

            <form className={styles.form}>
                <textarea className={styles['post-input']} placeholder="Type comment here..." >
                </textarea>
                <button type="submit" className={`btn-blue ${styles['btn-post']}`} >Send
                        <span className={'dots'}><FontAwesomeIcon icon={faEllipsis} /></span>
                </button>
            </form>
        </div>

    );
};

export default CommentForm;