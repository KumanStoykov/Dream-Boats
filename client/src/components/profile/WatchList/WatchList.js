import { useSelector } from 'react-redux';

import BoatsList from '../../boat/BoatList/BoatList';
import NoResultHeading from '../../ui/NoResultHeading/NoResultHeading';


const WatchList = () => {

    const allWatched = useSelector(state => state.watchList.watchList);
    const heading = 'Boats';
    const subHeading = 'Watch List';

    return (
        <>
            <section className='section-container'>
                {allWatched.length > 0
                    && <BoatsList
                        boats={allWatched}
                        heading={heading}
                        subHeading={subHeading}
                    />
                }
                {allWatched.length < 1
                    && <NoResultHeading title={'No Boats yet'} />
                }
            </section>
        </>
    );
};

export default WatchList;