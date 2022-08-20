import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { boatStoreActions } from '../../store/boatStore';
import useFetch from '../../hooks/useFetch';
import boatService from '../../services/boatService';

import DetailsCard from '../../components/boat/DetailsCard/DetailsCard';
import BoatHero from '../../components/boat/BoatHero/BoatHero';

import Spinner from '../../components/ui/Spinner/Spinner';

import styles from '../../components/boat/DetailsCard/DetailsCard.module.css';


const DetailsBoat = () => {
    const { boatId } = useParams();
    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();
    const boat = useSelector(state => state.allBoats.boat);
    const appIsLoad = useSelector(state => state.app.appIsLoad);


    const responseData = useCallback((data) => {
        dispatch(boatStoreActions.addBoat(data));
    }, [dispatch]);


    useEffect(() => {
        requester(boatService.getOneById(boatId), responseData);

    }, [boatId, requester, dispatch, responseData]);

    const detailsHeroImages = {
        firstImg: '/images/sailboat_1.jpg',
        secundImg: '/images/sailboat_2.jpg',
        thirdImg: '/images/sailboat_3.jpg'
    };


    return (
        <>
            {appIsLoad
                ? <Spinner size={'boat-hero-details'} />
                : <BoatHero imgs={detailsHeroImages} size={'smaller'} />
            }

            <div className={styles.border} />
            <section className={styles.details}>
                <div className={styles['container-details']}>
                    {isLoading && <Spinner size={'large'} />}
                    {!isLoading && boat !== null && <DetailsCard boat={boat} />}
                </div>
            </section>
        </>
    );
};

export default DetailsBoat;