import styles from './NoResultHeading.module.css';

const NoResultHeading = ({
    isSearch,
    title 
}) => {


    return(
        <div className={styles['heading-container']}>
            {isSearch
            ? <h3 className={styles['no-boats-heading']}>No Result</h3>
            : <h3 className={styles['no-boats-heading']}>{title}</h3>}
        </div>
    );
};

export default NoResultHeading;