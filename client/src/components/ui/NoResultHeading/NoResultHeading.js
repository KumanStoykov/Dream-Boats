import styles from './NoResultHeading.module.css';

const NoResultHeading = ({
    isSearch,
    title,
    size 
}) => {


    return(
        <div className={`${styles['heading-container']} ${size && styles.size}`}>
            {isSearch
            ? <h3 className={styles['no-boats-heading']}>No Result</h3>
            : <h3 className={styles['no-boats-heading']}>{title}</h3>}
        </div>
    );
};

export default NoResultHeading;