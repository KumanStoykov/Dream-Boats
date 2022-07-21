import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { boatStoreActions } from '../../store/boatStore';
import useFetch from '../../hooks/useFetch';
import boatService from '../../services/boatService';

import Hero from '../../components/home/Hero/Hero';
import Comments from '../../components/home/Comments/Comments';
import NewBoats from '../../components/boat/NewBoats/NewBoats';

import Search from '../../components/ui/Search/Search';
import Spinner from '../../components/ui/Spinner/Spinner';

const Home = () => {
    const dispatch = useDispatch();
    const {isLoading, requester} = useFetch();
    const boats = useSelector(state => state.allBoats.boats);
    
    const responseData = useCallback((data) => {
        dispatch(boatStoreActions.addBoats(data));
    },[dispatch]);

    useEffect(() => {
        requester(boatService.getLastThree(), responseData);
    }, [requester]);

    return (
        <>
            <Hero />
            <Search />
            {isLoading
                ? <Spinner size={'large'} />
                : <NewBoats boats={boats} />
            }            
            <Comments />
        </>
    );
};

export default Home;