
import BoatsList from '../../components/boat/boatsCatalog/BoatsList/BoatsList';
import Search from '../../components/ui/Search/Search';
import BoatsCatalogHero from '../../components/boat/boatsCatalog/BoatsCatalogHero/BoatsCatalogHero';



const BoatsCatalog = () => {
  

    return (
        <>
            <BoatsCatalogHero />
            <Search />
            <BoatsList />         
        </>
    )
};
export default BoatsCatalog;