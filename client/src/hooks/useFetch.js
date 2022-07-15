import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const dispatch = useDispatch();

    const requester = useCallback(async (options, dataSend) => {

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


            setIsLoading(false);

            if (dataSend) {
                dataSend(result);
            }
            return result;

        } catch (error) {
            let errorMsg = error.message;
            console.log(errorMsg);

            setServerError(errorMsg);
            setIsLoading(false);
        }


    }, [dispatch]);


    return {
        isLoading,
        serverError,
        requester
    }
};

export default useFetch;