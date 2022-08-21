import { useSelector } from 'react-redux';

import BoatsList from '../../boat/BoatList/BoatList';


const WatchList = () => {

    const allWatched = useSelector(state => state.watchList.watchList);
    const heading = 'Boats';
    const subHeading = 'Watch List';

    return (
        <>
            <section className='section-container'>
                <BoatsList
                    boats={allWatched}
                    heading={heading}
                    subHeading={subHeading}
                    title={'No Boats yet'}
                />
            </section>
        </>
    );
};

export default WatchList;