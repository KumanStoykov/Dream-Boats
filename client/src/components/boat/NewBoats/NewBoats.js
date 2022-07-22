import BoatCard from '../BoatCard/BoatCard';

import styles from './NewBoats.module.css';


const NewBoats = ({ 
    boats,
    fancyBoarder
 }) => {


    return (

        <>
            <h5 className={styles['section-head']}>
                <span className={styles.heading}>New Arrival</span>
                <span className={styles['sub-heading']}>Our explore Boats</span>
            </h5>
            <div className='grid'>
                {boats?.map(x => <BoatCard key={x._id} boat={x} fancyBoarder={fancyBoarder} />)}
            </div>
        </>


    );

};

export default NewBoats;