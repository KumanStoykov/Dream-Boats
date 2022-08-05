import styles from './NoBoatsHeading.module.css';

const NoBoatsHeading = ({
    isSearch
}) => {


    return(
        <div className={styles['heading-container']}>
            {isSearch
            ? <h3 className={styles['no-boats-heading']}>No Result</h3>
            : <h3 className={styles['no-boats-heading']}>No Boats yet</h3>}
        </div>
    );
};

export default NoBoatsHeading;