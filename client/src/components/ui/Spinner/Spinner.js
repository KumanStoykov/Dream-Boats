import styles from './Spinner.module.css';

const Spinner = ({
    size
}) => {
    
    return (
        <div className={`${styles.loader} ${styles[size]}`}>
            <div className={`${styles.circle} ${styles[`circle-${size}`]}`}></div>
            <div className={`${styles.circle} ${styles[`circle-${size}`]}`}></div>
            <div className={`${styles.circle} ${styles[`circle-${size}`]}`}></div>
        </div>
    );
};

export default Spinner;