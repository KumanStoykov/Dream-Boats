import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons';

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

    const heading = 'Boats';
    const subHeading = <FontAwesomeIcon icon={faDharmachakra} />;


    const responseData = useCallback((data) => {
        dispatch(boatStoreActions.addBoats(data));
    }, [dispatch]);

    useEffect(() => {
        requester(boatService.getAll(), responseData);
    }, [requester, responseData, dispatch]);

    return (
        <>
            <BoatCatalogHero />
            <Search />
            <section className={styles.boats}>
                {isLoading && <Spinner size={'large'} />}
                {!isLoading
                    && boats.length > 0
                    && <BoatsList
                        boats={boats}
                        heading={heading}
                        subHeading={subHeading}
                    />
                }
            </section>
        </>
    )
};
export default BoatsCatalog;