import Spinner from '../../ui/Spinner/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import styles from './ProfileForm.module.css';

const ProfileForm = () => {

    return(
        <section className={styles.register}>
            <div className={'container'}>
                <h5 className={styles['section-head']}>
                    <span className={styles.heading}>Create your offer</span>
                    <span className={styles['sub-heading']}>Discover</span>
                </h5>
                <div className={styles['register-content']}>                  
                    <form className={styles['register-form']} >
                        <div className={styles['input-group-wrap']}>
                            <div className={styles['input-group']}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Model"
                                    name='Model'
                                    // disabled={isLoading}
                                />
                                <span className={styles.bar}></span>
                            </div>
                            <div className={styles['input-group']}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Category"
                                    name='Category'
                                    // disabled={isLoading}
                                />
                                <span className={styles.bar}></span>
                            </div>
                        </div>
                        <div className={styles['input-group-wrap']}>
                            <div className={styles['input-group']}>
                                <input
                                    type="number"
                                    className={styles.input}
                                    placeholder="Price"
                                    name='Price'
                                    // disabled={isLoading}
                                />
                                <span className={styles.bar}></span>
                            </div>
                            <div className={styles['input-group']}>
                                <input
                                    type="number"
                                    className={styles.input}
                                    placeholder="Year"
                                    name='lastName'
                                    // disabled={isLoading}
                                />
                                <span className={styles.bar}></span>
                            </div>
                        </div>
                        <div className={styles['input-group-wrap']}>
                            <div className={styles['input-group']}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Fuel"
                                    name='firstName'
                                    // disabled={isLoading}
                                />
                                <span className={styles.bar}></span>
                            </div>
                            <div className={styles['input-group']}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Image"
                                    name='lastName'
                                    // disabled={isLoading}
                                />
                                <span className={styles.bar}></span>
                            </div>
                        </div>
                        <div className={styles['input-group-wrap']}>
                            <div className={styles['input-group']}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="First name"
                                    name='firstName'
                                    // disabled={isLoading}
                                />
                                <span className={styles.bar}></span>
                            </div>
                            <div className={styles['input-group']}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Last name"
                                    name='lastName'
                                    // disabled={isLoading}
                                />
                                <span className={styles.bar}></span>
                            </div>
                        </div>


                     

                        <div className={styles['input-group']}>
                            {/* <p className={styles['register-now']}>Already have account? <Link to="/auth/login" >Login Now!</Link></p> */}
                        </div>

                        <button
                            type="submit"
                            className={'btn-blue'}
                            // disabled={isLoading}
                        >Register
                        {false
                        ? <Spinner size={'small'} />
                        : <span className={'dots'}><FontAwesomeIcon icon={faEllipsisH} /></span>
                        }
                            
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ProfileForm;
