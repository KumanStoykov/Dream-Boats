import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetch from '../../hooks/useFetch';
import boatService from '../../services/boatService';
import { boatStoreActions } from '../../store/boatStore';

import BoatsList from '../../components/boat/BoatList/BoatList';
import BoatCatalogHero from '../../components/boat/BoatCatalogHero/BoatCatalogHero';

import Search from '../../components/ui/Search/Search';
import Spinner from '../../components/ui/Spinner/Spinner';


import styles from '../../components/boat/BoatList/BoatList.module.css';

const BoatsCatalog = () => {
    const dispatch = useDispatch();
    const boats = useSelector(state => state.allBoats.boats);
    const { isLoading, requester } = useFetch();


    const responseData = useCallback((data) => {
        dispatch(boatStoreActions.addBoats(data));
    }, [dispatch]);

    
    useEffect(() => {
        requester(boatService.getAll(), responseData);        
    }, [requester, responseData]);

    return (
        <>
            <BoatCatalogHero />
            <Search />
            {isLoading && <Spinner size={'large'} />}
            <section className={styles.boats}>
                <BoatsList boats={boats}/>
            </section>
        </>
    )
};
export default BoatsCatalog;