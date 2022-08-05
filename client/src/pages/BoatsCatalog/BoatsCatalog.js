import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../hooks/useFetch';
import boatService from '../../services/boatService';
import { boatStoreActions } from '../../store/boatStore';

import BoatsList from '../../components/boat/BoatList/BoatList';
import BoatCatalogHero from '../../components/boat/BoatCatalogHero/BoatCatalogHero';
import NoBoatsHeading from '../../components/ui/NoBoatsHeading/NoBoatsHeading';

import Search from '../../components/ui/Search/Search';
import Spinner from '../../components/ui/Spinner/Spinner';
import Pagination from '../../components/ui/Pagination/Pagination';

import queryUtil from '../../utils/queryUtil';


const BoatsCatalog = () => {
    const { search } = useLocation();
    const dispatch = useDispatch();
    const boats = useSelector(state => state.allBoats.boats);
    const boatsCount = useSelector(state => state.allBoats.boatsCount);
    const { isLoading, requester } = useFetch();

    const isSearch = ['type', 'fuel', 'price'].some(x => search.includes(x));

    const totalPages = Math.ceil(boatsCount / 9);

    const heading = 'Boats';
    const subHeading = <FontAwesomeIcon icon={faDharmachakra} />;

    const {page} = queryUtil.queryExtract(search);

    const responseData = useCallback((data) => {
        dispatch(boatStoreActions.addBoats(data));
    }, [dispatch]);

    useEffect(() => {
        requester(boatService.getAll(search), responseData);
    }, [requester, responseData, dispatch, search]);

    return (
        <>
            <BoatCatalogHero />
            <Search />
            <section className='section-container'>
                {isLoading && <Spinner size={'large'} />}
                {!isLoading
                    && boats.length > 0
                    && <BoatsList
                        boats={boats}
                        heading={heading}
                        subHeading={subHeading}
                    />
                }
                {!isLoading 
                && boats.length < 1
                && <NoBoatsHeading isSearch={isSearch}/>
                }
            </section>
            {!isLoading && boatsCount > 9 && <Pagination
                totalPages={totalPages}
                page={page}
                isLoading={isLoading}
            />}
        </>
    )
};
export default BoatsCatalog;