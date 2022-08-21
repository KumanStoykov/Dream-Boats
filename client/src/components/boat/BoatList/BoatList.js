import BoatCard from '../BoatCard/BoatCard';
import NoResultHeading from '../../ui/NoResultHeading/NoResultHeading';


import styles from './BoatList.module.css';

const BoatsList = ({
    boats,
    heading,
    subHeading,
    fancyBoarder,
    title,
    isSearch
}) => {

    return (
        <div className={'container'}>
            <h5 className={styles['section-head']}>
                <span className={styles.heading}>{heading}</span>
                <span className={styles['anchor-heading']}>{subHeading}</span>
            </h5>

            {boats.length === 0
                ? <NoResultHeading title={title} isSearch={isSearch} />
                : <ul className={'grid'}>
                    {boats.map(x => <BoatCard key={x._id} boat={x} fancyBoarder={fancyBoarder} />)}
                </ul>
            }
        </div>
    );

};

export default BoatsList;