import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../../hooks/useFetch';
import boatService from '../../../services/boatService';

import BoatCard from '../BoatCard/BoatCard';
import Spinner from '../../ui/Spinner/Spinner';


import styles from './BoatList.module.css';




const BoatsList = () => {
    const dispatch = useDispatch();
    const { isLoading, serverError, requester } = useFetch();
    const [boats, setBoats] = useState([]);

    const responseData = useCallback((data) => {
        setBoats(data.allBoats);
    }, []);

    useEffect(() => {
        requester(boatService.getAll(), responseData);
        console.log('logooooooo')
    }, [requester, responseData]);
 

    return (
        <section className={styles.boats}>
            <div className={'container'}>
                <h5 className={styles['section-head']}>
                    <span className={styles.heading}>Boats</span>
                    <span className={styles['anchor-heading']}><FontAwesomeIcon icon={faDharmachakra} /></span>
                </h5>
                <ul className={'grid'}>
                  {boats.map(x => <BoatCard key={x._id} boat={x}/>)}
                </ul>
            </div>
        </section>

    );

};

export default BoatsList;