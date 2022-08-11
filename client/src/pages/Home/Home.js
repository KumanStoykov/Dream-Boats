import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { boatStoreActions } from '../../store/boatStore';
import useFetch from '../../hooks/useFetch';
import boatService from '../../services/boatService';

import Hero from '../../components/home/Hero/Hero';
import LastComment from '../../components/home/LastComment/LastComment';
import NewBoats from '../../components/boat/NewBoats/NewBoats';

import Search from '../../components/ui/Search/Search';
import Spinner from '../../components/ui/Spinner/Spinner';


const Home = () => {
    const dispatch = useDispatch();
    const { isLoading, requester } = useFetch();
    const boats = useSelector(state => state.allBoats.boats);

    const heading = 'New Arrival';
    const subHeading = 'Our explore Boats';

    const responseData = useCallback((data) => {
        dispatch(boatStoreActions.addBoats(data));
    }, [dispatch]);

    useEffect(() => {
        requester(boatService.getLastThree(), responseData);
    }, [requester, dispatch, responseData]);

    return (
        <>
            <Hero />
            <Search />
            <div className={'container'}>
                {isLoading && <Spinner size={'medium'} />}
                {!isLoading
                    && <NewBoats boats={boats}
                        fancyBoarder={'fancy-boarder'}
                        heading={heading} 
                        subHeading={subHeading}
                    />
                }
            </div>
            <LastComment />
        </>
    );
};

export default Home;