import Hero from '../../components/home/Hero/Hero';
import Comments from '../../components/home/Comments/Comments';
import NewBoats from '../../components/home/NewBoats/NewBoats';

import Search from '../../components/ui/Search/Search';

const Home = () => {

    return(
        <>
        <Hero />
        <Search />
        <NewBoats />
        <Comments />
        </>
    );
};

export default Home;