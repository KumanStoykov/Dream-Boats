import styles from './BoatCatalogHero.module.css';

const BoatsCatalogHero = () => {
   
    return (
        <div className={styles.BoatsCatalogHero}>
            <div className={styles['image-container']}>
                <img src="/images/catalog_1.jpg" alt="boat" />
                <img src="/images/catalog_2.jpg" alt="boat" />
                <img src="/images/catalog_3.jpg" alt="boat" />
            </div>
        </div>

    );
};

export default BoatsCatalogHero;
