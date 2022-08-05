import { useSelector } from 'react-redux';

import BoatsList from '../../boat/BoatList/BoatList';
import NoBoatsHeading from '../../ui/NoBoatsHeading/NoBoatsHeading';
import Spinner from '../../ui/Spinner/Spinner';


const WatchList = () => {

    const watched = useSelector(state => state.auth.watched);

    const heading = 'Boats';
    const subHeading = 'Watch List';

    return (
        <>
            <section className='section-container'>
                {/* {isLoading && <Spinner size={'large'} />} */}
                {watched.length > 0
                    && <BoatsList
                        boats={watched}
                        heading={heading}
                        subHeading={subHeading}
                    />
                }
                {watched.length < 1
                    && <NoBoatsHeading />
                }
            </section>          
        </>
    );
};

export default WatchList;