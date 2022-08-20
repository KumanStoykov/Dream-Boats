import styles from './EditInput.module.css';

const EditInput = ({
    id,
    nameInput,
    valueInput,
    onChangeInput,
    onBlurInput,
    hasErrorInput,
    errorMessage
}) => {


    return (
        <>
            <input
                id={id}
                type='text'
                className={`${styles['user-edit-input']} ${hasErrorInput && 'error-input-field'}`}
                name={nameInput}
                value={valueInput}
                onChange={onChangeInput}
                onBlur={onBlurInput}
            />
            {hasErrorInput && <p className={styles['error-user']}>{errorMessage}</p>}
        </>
    );
};

export default EditInput;