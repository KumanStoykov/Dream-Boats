import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { boatStoreActions } from '../../store/boatStore';
import useFetch from '../../hooks/useFetch';
import boatService from '../../services/boatService';

import DetailsCard from '../../components/details/DetailsCard/DetailsCard';

import Spinner from '../../components/ui/Spinner/Spinner';


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

    }, [requester, dispatch, boat]);

    return (
        <>
            <DetailsCard boat={boat} />
        </>
    );
};

export default DetailsBoat;