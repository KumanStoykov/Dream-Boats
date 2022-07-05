import styles from './Spinner.module.css';

const Spinner = () => {

    return (
        <section className={styles.preloader}>
            <div className={styles.spinner}>
                <span className={styles['sk-inner-circle']} />
            </div>
        </section>
    );
};

export default Spinner;