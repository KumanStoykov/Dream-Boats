import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { boatStoreActions } from '../../store/boatStore';
import useFetch from '../../hooks/useFetch';
import boatService from '../../services/boatService';

import DetailsCard from '../../components/details/DetailsCard/DetailsCard';

import Spinner from '../../components/ui/Spinner/Spinner';

import styles from '../../components/details/DetailsCard/DetailsCard.module.css';


const DetailsBoat = () => {
    const { boatId } = useParams();
    const dispatch = useDispatch();
    const boat = useSelector(state => state.allBoats.boat);

    const { isLoading, requester } = useFetch();

    const responseData = useCallback((data) => {
        dispatch(boatStoreActions.addBoat(data));
    }, [dispatch]);


    useEffect(() => {
        requester(boatService.getOneById(boatId), responseData);
    }, [boatId, requester, dispatch, responseData]);


    return (
        <section className={styles.details}>
            <div className={styles['container-details']}>
                {isLoading && <Spinner size={'large'} />}
                {!isLoading && boat !== null && <DetailsCard boat={boat} />}
            </div>
        </section>
    );
};

export default DetailsBoat;