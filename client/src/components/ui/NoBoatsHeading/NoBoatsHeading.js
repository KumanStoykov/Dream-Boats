import styles from './NoBoatsHeading.module.css';

const NoBoatsHeading = () => {


    return(
        <div className={styles['heading-container']}>
            <h3 className={styles['no-boats-heading']}>No Boats yet</h3>
        </div>
    );
};

export default NoBoatsHeading;