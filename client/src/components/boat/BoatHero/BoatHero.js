import styles from './BoatHero.module.css';

const BoatHero = ({
    imgs, 
    size
}) => {
   
    return (
        <div className={styles.BoatHero}>
            <div className={styles['image-container']}>
                <img className={size === 'smaller' ? styles.smaller : styles.bigger}  src={imgs.firstImg} alt='boat' />
                <img className={size === 'smaller' ? styles.smaller : styles.bigger} src={imgs.secundImg} alt='boat' />
                <img className={size === 'smaller' ? styles.smaller : styles.bigger} src={imgs.thirdImg} alt='boat' />
            </div>
        </div>
    );
};

export default BoatHero;
