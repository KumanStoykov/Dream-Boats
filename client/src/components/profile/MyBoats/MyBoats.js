import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useFetch from '../../../hooks/useFetch';
import boatService from '../../../services/boatService';
import { boatStoreActions } from '../../../store/boatStore';


import BoatsList from '../../boat/BoatList/BoatList';
import NoBoatsHeading from '../../ui/NoBoatsHeading/NoBoatsHeading';
import Spinner from '../../ui/Spinner/Spinner';

const MyBoats = () => {
    const { search } = useLocation();

    const dispatch = useDispatch();
    const boats = useSelector(state => state.allBoats.boats);
    const { isLoading, requester } = useFetch();

    const heading = 'Boats';
    const subHeading = 'Your Offers';

    const responseData = useCallback((data) => {
        dispatch(boatStoreActions.addBoats(data));
    }, [dispatch]);

    useEffect(() => {
        requester(boatService.getByOwner(search), responseData);
    }, [requester, responseData, dispatch]);


    return (
        <section className='section-container'>
            {isLoading && <Spinner size={'large'} />}
            {!isLoading && boats.length > 0
                && <BoatsList
                    boats={boats}
                    heading={heading}
                    subHeading={subHeading}
                />
            }
            {!isLoading && boats.length < 1
                && <NoBoatsHeading />
            }
        </section>
    );

};

export default MyBoats;