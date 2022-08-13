import { useCallback, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useFetch from '../../../hooks/useFetch';
import boatService from '../../../services/boatService';
import { boatStoreActions } from '../../../store/boatStore';


import BoatsList from '../../boat/BoatList/BoatList';
import NoResultHeading from '../../ui/NoResultHeading/NoResultHeading';
import Pagination from '../../ui/Pagination/Pagination';
import Spinner from '../../ui/Spinner/Spinner';

const MyBoats = () => {
    const { search } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const boats = useSelector(state => state.allBoats.boats);
    const boatsCount = useSelector(state => state.allBoats.boatsCount);
    const { isLoading, requester } = useFetch();

    const totalPages = Math.ceil(boatsCount / 6);

    const heading = 'Boats';
    const subHeading = 'Your Offers';

    const page = searchParams.get('page');

    const responseData = useCallback((data) => {
        dispatch(boatStoreActions.addBoats(data));
    }, [dispatch]);

    useEffect(() => {
        requester(boatService.getByOwner(search), responseData);
    }, [requester, responseData, dispatch, search]);


    return (
        <>
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
                    && <NoResultHeading title={'No Boats yet'} />
                }
            </section>
            {!isLoading && boatsCount > 6 && <Pagination
                totalPages={totalPages}
                page={page}
                isLoading={isLoading}
            />
            }
        </>
    );

};

export default MyBoats;