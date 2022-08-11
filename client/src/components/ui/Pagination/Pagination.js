import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useScrollToTop from '../../../hooks/useScrollToTop';

import paginationUtil from '../../../utils/paginationUtil';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Pagination.module.css';


const Pagination = ({ totalPages, page, isLoading }) => {

    useScrollToTop();// Scrolled to top after change pagination 

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    page = Number(page);

    const viewPages = totalPages > 5 ? 5 : totalPages;

    const { start } = paginationUtil.pageRange(page, totalPages);

    const pageArray = paginationUtil.pageArray(viewPages, start, totalPages);
    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const firstPageHandler = () => {
        setCurrentPage(1);
        searchParams.set('page', 1);
        searchParams.set('sort', 'desc');
        setSearchParams(searchParams);
    };

    const lastPageHandler = () => {
        if (viewPages >= page) {
            setCurrentPage(totalPages);
            searchParams.set('page', totalPages);
            searchParams.set('sort', 'desc');
            setSearchParams(searchParams);
        }
        return;
    };

    const setPageHandler = (page) => {
        setCurrentPage(page);
        searchParams.set('page', page);
        searchParams.set('sort', 'desc');
        setSearchParams(searchParams);
    };


    return (
        <div className={styles['pagination-container']}>
            <div className={styles.pagination}>
                <button
                    onClick={firstPageHandler}
                    className={styles.arrow}
                    disabled={currentPage === 1 || isLoading}
                >
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </button>

                {pageArray.map((pg) =>
                    <button
                        key={pg}
                        disabled={isLoading}
                        className={`${styles.page} ${pg === currentPage ? styles.active : ''}`}
                        onClick={setPageHandler.bind(null, pg)}
                    > {pg}
                    </button>)}

                <button
                    onClick={lastPageHandler}
                    className={styles.arrow}
                    disabled={currentPage === totalPages || isLoading}
                >
                    <FontAwesomeIcon icon={faAnglesRight} />
                </button>

            </div >
        </div>
    );
};

export default Pagination;