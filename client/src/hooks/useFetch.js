import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { modalStoreActions } from '../store/modalStore';
import { authStoreActions } from '../store/authStore';


const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const dispatch = useDispatch();

    const requester = useCallback(async (options, dataStored) => {

        setIsLoading(true);
        setServerError(null);

        try {
            const res = await fetch(options.url, {
                method: options.method || 'GET',
                credentials: 'include',
                headers: options.headers || {},
                body: options.body || null
            });
            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }
            if (dataStored) {
                dataStored(result);
            }

            setIsLoading(false);
            return result;

        } catch (error) {
            let errorMsg = error.message;
            console.log(errorMsg);

            if (errorMsg === 'Please log in') {
                dispatch(authStoreActions.logout());
            }

            if(errorMsg === 'Failed to fetch') {
                errorMsg = 'Oops, something has gone wrong, please try again!'
            }

            setServerError(errorMsg);
            setIsLoading(false);
        }


    }, [dispatch]);

    useEffect(() => {
        if (serverError) {
            dispatch(modalStoreActions.open({ type: 'error', message: serverError }))
        }
    }, [dispatch, serverError]);


    return {
        isLoading,
        serverError,
        requester
    }
};

export default useFetch;