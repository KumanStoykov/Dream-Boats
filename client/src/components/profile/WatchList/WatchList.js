import { useSelector } from 'react-redux';

import BoatsList from '../../boat/BoatList/BoatList';
import NoBoatsHeading from '../../ui/NoBoatsHeading/NoBoatsHeading';
import Spinner from '../../ui/Spinner/Spinner';


const WatchList = () => {

    const allWatched = useSelector(state => state.watchList.watchList);

    const heading = 'Boats';
    const subHeading = 'Watch List';

    return (
        <>
            <section className='section-container'>
                {/* {isLoading && <Spinner size={'large'} />} */}
                {allWatched.length > 0
                    && <BoatsList
                        boats={allWatched}
                        heading={heading}
                        subHeading={subHeading}
                    />
                }
                {allWatched.length < 1
                    && <NoBoatsHeading />
                }
            </section>          
        </>
    );
};

export default WatchList;