import styles from './EditInput.module.css';

const EditInput = ({
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
                type='text'
                className={styles['user-edit-input']}
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