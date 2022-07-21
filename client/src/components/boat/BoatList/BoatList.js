import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons';


import BoatCard from '../BoatCard/BoatCard';


import styles from './BoatList.module.css';



const BoatsList = ({ boats }) => {
    
    return (

        <div className={'container'}>
            <h5 className={styles['section-head']}>
                <span className={styles.heading}>Boats</span>
                <span className={styles['anchor-heading']}><FontAwesomeIcon icon={faDharmachakra} /></span>
            </h5>
            <ul className={'grid'}>
                {boats.map(x => <BoatCard key={x._id} boat={x} />)}
            </ul>
        </div>
    );

};

export default BoatsList;