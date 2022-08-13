import { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchor } from '@fortawesome/free-solid-svg-icons';



import styles from './Search.module.css';

const Search = () => {
    const navigate = useNavigate();
    const { search, pathname } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputState, setInputState] = useState({ type: '', fuel: '', price: 0 });

    useEffect(() => {
        searchParams.set('page', 1);
        searchParams.set('type', inputState.type);
        searchParams.set('fuel', inputState.fuel);
        searchParams.set('price', inputState.price);
    }, [inputState, searchParams, search]);

    const changeHandler = (type, e) => {
        setInputState(state => ({
            ...state,
            [type]: e.target.value

        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!pathname.includes('boats-for-sale')) {
            const type = searchParams.get('type');
            const fuel = searchParams.get('fuel');
            const price = searchParams.get('price');

            navigate(`/boats-for-sale?page=1&sort=desc&type=${type}&fuel=${fuel}&price=${price}`)
        } else {
            
            setSearchParams(searchParams);
        }
    }

    return (
        <section className={styles.search}>
            <div className={'container'}>
                <form onSubmit={submitHandler} className={styles['book-form']}>
                    <div className={styles['input-group']}>
                        <label htmlFor="type" className={styles['input-label']}>Category</label>
                        <select
                            name="type"
                            id="type"
                            className={styles.options}
                            value={inputState.type}
                            onChange={changeHandler.bind(null, 'type')}
                        >
                            <option value={''}>Any</option>
                            <option value={'yacht'}>Yacht</option>
                            <option value={'motorboat'}>Motorboat</option>
                            <option value={'sailboat'}>Sailboat</option>
                        </select>
                    </div>
                    <div className={styles['input-group']}>
                        <label htmlFor="fuel" className={styles['input-label']}>Fuel</label>
                        <select
                            name="fuel"
                            id="fuel"
                            className={styles.options}
                            value={inputState.fuel}
                            onChange={changeHandler.bind(null, 'fuel')}
                        >
                            <option value={''}>Any</option>
                            <option value={'petrol'}>Petrol</option>
                            <option value={'diesel'}>Diesel</option>
                        </select>
                    </div>
                    <div className={styles['input-group']}>
                        <label htmlFor="priceFrom" className={styles['input-label']}>Price</label>
                        <select
                            name="price"
                            id="price"
                            className={styles.options}
                            value={inputState.price}
                            onChange={changeHandler.bind(null, 'price')}
                        >
                            <option value={0}>0</option>
                            <option value={10000}>10,000$</option>
                            <option value={30000}>30,000$</option>
                            <option value={50000}>50,000$</option>
                            <option value={70000}>70,000$</option>
                            <option value={100000}>100,000$</option>
                            <option value={200000}>200,000$</option>
                            <option value={500000}>500,000$</option>
                        </select>
                    </div>

                    <button
                        className={'btn-blue'}
                    >Search
                        <span className={styles.anchor}><FontAwesomeIcon icon={faAnchor} /></span>
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Search;