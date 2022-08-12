import styles from './Spinner.module.css';

const Spinner = ({
    size,
    frame
}) => {

    return (
        <div className={frame && styles.frame}>
            <div className={`${styles.loader} ${styles[size]}`}>
                <div className={`${styles.circle} ${styles[`circle-${size}`]}`}></div>
                <div className={`${styles.circle} ${styles[`circle-${size}`]}`}></div>
                <div className={`${styles.circle} ${styles[`circle-${size}`]}`}></div>
            </div>
        </div>
    );
};

export default Spinner;