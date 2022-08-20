import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { modalStoreActions } from '../../../store/modalStore';
import { watchStoreActions } from '../../../store/watchStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare, faPenSquare, faEnvelope, faCheck, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'

import Slideshow from '../../ui/Slider/Slider';

import styles from './DetailsCard.module.css';


const DetailsCard = ({ boat }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.userData);
    const watchList = useSelector(state => state.watchList.watchList);

    const isOwner = user?._id === boat.owner;
    const hasWatched = watchList?.find(x => x._id === boat._id);

    const watchedHandler = () => {
        if (!hasWatched) {
            dispatch(watchStoreActions.addWatched({ boat }));
        } else if (hasWatched) {
            dispatch(watchStoreActions.removeWatched({ boat }));
        }
    };

    const emailHandler = () => {
        dispatch(modalStoreActions.open({
            type: 'email',
            model: 'boat',
            message: ''
        }));
    };
    const deleteHandler = () => {
        dispatch(modalStoreActions.open({
            type: 'delete',
            model: 'boat',
            message: 'Are you sure?'
        }));
    };

    return (

        <div className={styles.card}>
            <div className={styles['boat-imgs']}>
                <div className={styles['img-display']}>
                    <Slideshow
                        thumbnail={true}
                        imgs={boat.image.map(x => x.url)}
                    />
                </div>
            </div>

            <div className={styles['boat-content']}>
                <h2 className={styles['boat-title']}>{boat.make}</h2>
                <button
                    onClick={watchedHandler}
                    className={styles['boat-watched']}
                >
                    {hasWatched
                        ? <FontAwesomeIcon icon={faBookmarkRegular} />
                        : <FontAwesomeIcon icon={faBookmark} />
                    }
                </button>

                <div className={styles['boat-price']}>
                    <p className={styles['new-price']}>Price: <span>${boat.price.toLocaleString()}</span></p>
                </div>
                <div className={styles['boat-detail']}>
                    <h2>About This Boat: </h2>
                    <p>{boat.description}</p>
                    <ul>
                        <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Model: <span>{boat.model}</span></li>
                        <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Year: <span>{boat.year}</span></li>
                        <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Condition: <span>{boat.condition}</span></li>
                        <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Type: <span>{boat.type}</span></li>
                        <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Length: <span>{boat.boatLength} m.</span></li>
                        <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Engine Make: <span>{boat.engineMake}</span></li>
                        <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Fuel type: <span>{boat.fuel}</span></li>
                        <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Hull Material: <span>{boat.hullMaterial}</span></li>
                        <li><FontAwesomeIcon className={styles.check} icon={faCheck} /> Location: <span>{boat.location}</span></li>
                    </ul>
                </div>
                <div className={styles['btn-group']}>

                    {isOwner
                        && <>
                            <Link
                                to={`/profile/boat/${boat._id}/edit`}
                                className={`btn-gradient ${styles['btn-details-card']}`}
                            >Edit
                                <FontAwesomeIcon className={styles.icons} icon={faPenSquare} />
                            </Link>

                            <button
                                type="submit"
                                className={`btn-gradient ${styles['btn-details-card']}`}
                                onClick={deleteHandler}
                            >Delete
                                <FontAwesomeIcon className={styles.icons} icon={faXmarkSquare} />
                            </button>
                        </>
                    }


                    {!isOwner
                        && <button
                            type="submit"
                            className={`btn-gradient ${styles['btn-details-card']}`}
                            onClick={emailHandler}
                        >Contact
                            <FontAwesomeIcon className={styles.icons} icon={faEnvelope} />
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default DetailsCard;