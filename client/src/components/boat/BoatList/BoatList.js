import BoatCard from '../BoatCard/BoatCard';

import styles from './BoatList.module.css';

const BoatsList = ({ 
    boats,
    heading,
    subHeading,
    fancyBoarder
 }) => {
    
    return (

        <div className={'container'}>
            <h5 className={styles['section-head']}>
                <span className={styles.heading}>{heading}</span>
                <span className={styles['anchor-heading']}>{subHeading}</span>
            </h5>
            <ul className={'grid'}>
                {boats.map(x => <BoatCard key={x._id} boat={x} fancyBoarder={fancyBoarder} />)}
            </ul>
        </div>
    );

};

export default BoatsList;