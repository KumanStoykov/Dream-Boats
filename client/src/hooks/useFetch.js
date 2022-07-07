import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const dispatch = useDispatch();

    const requester = useCallback(async (options, dataSend) => {      

        setIsLoading(true);
        setErrors(null);

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
            dataSend(result)

        } catch (error) {
            let errorMsg = error.message;
            console.log(errorMsg);

            setErrors(errorMsg);
            setIsLoading(false);
        }


    }, [dispatch]);//TODO...


    return {
        isLoading,
        errors,
        requester
    }
};

export default useFetch;