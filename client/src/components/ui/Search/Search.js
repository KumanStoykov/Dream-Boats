import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchor } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.css';

const Search = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.booking}>
            <div className={'container'}>
                <form className={styles['book-form']}>
                    <div className={styles['input-group']}>
                        <label htmlFor="type" className={styles['input-label']}>Category</label>
                        <select name="type" id="type" className={styles.options}>
                            <option value={'any'}>Any</option>
                            <option value={'yacht'}>Yacht</option>
                            <option value={'motorboat'}>Motorboat</option>
                            <option value={'sailboat'}>Sailboat</option>
                        </select>
                    </div>
                    <div className={styles['input-group']}>
                        <label htmlFor="gasoline" className={styles['input-label']}>Fuel</label>
                        <select name="gasoline" id="gasoline" className={styles.options}>
                            <option value={'any'}>Any</option>
                            <option value={'benzin'}>Benzin</option>
                            <option value={'diesel'}>Diesel</option>
                        </select>
                    </div>
                    <div className={styles['input-group']}>
                        <label htmlFor="priceFrom" className={styles['input-label']}>Price from</label>
                        <select name="priceFrom" id="priceFrom" className={styles.options}>
                            <option value={0}>0</option>
                            <option value={1}>10,000$</option>
                            <option value={2}>30,000$</option>
                            <option value={4}>50,000$</option>
                            <option value={5}>70,000$</option>
                            <option value={6}>100,000$</option>
                            <option value={7}>200,000$</option>
                            <option value={8}>500,000$</option>
                        </select>
                    </div>
                    <div className={styles['input-group']}>
                        <label htmlFor="priceTo" className={styles['input-label']}>Price to</label>
                        <select name="priceTo" id="priceTo" className={styles.options}>
                            <option value={0}>0</option>
                            <option value={1}>10,000$</option>
                            <option value={2}>30,000$</option>
                            <option value={4}>50,000$</option>
                            <option value={5}>70,000$</option>
                            <option value={6}>100,000$</option>
                            <option value={7}>200,000$</option>
                            <option value={8}>500,000$</option>
                        </select>
                    </div>

                    <button type="submit" className={'btn-blue'} onClick={() => navigate('/boats-catalog')}>Search
                        <span className={'dots'}><FontAwesomeIcon icon={faAnchor} /></span>
                    </button>
                </form>
            </div>
        </section>

    );
};

export default Search;