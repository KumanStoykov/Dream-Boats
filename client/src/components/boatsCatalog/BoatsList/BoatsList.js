import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons';

import { boatStoreActions } from '../../../store/boatStore';
import useFetch from '../../../hooks/useFetch';
import boatService from '../../../services/boatService';

import BoatsCard from '../BoatsCard/BoatsCard';
import Spinner from '../../ui/Spinner/Spinner';


import styles from './BoatsList.module.css';




const BoatsList = () => {
    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();
    const [boats, setBoats] = useState([]);

    const responseData = useCallback((data) => {
        setBoats(data.allBoats);
    }, []);

    useEffect(() => {
        requester(boatService.getAll(), responseData)
    }, []);
 

    return (
        <section className={styles.boats}>
            <div className={'container'}>
                <h5 className={styles['section-head']}>
                    <span className={styles.heading}>Boats</span>
                    <span className={styles['anchor-heading']}><FontAwesomeIcon icon={faDharmachakra} /></span>
                </h5>
                <ul className={'grid'}>
                  {boats.map(x => <BoatsCard key={x._id} boat={x}/>)}
                </ul>
            </div>
        </section>

    );

};

export default BoatsList;