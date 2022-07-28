import BoatsList from '../BoatList/BoatList';

const NewBoats = ({ 
    boats,
    heading,
    subHeading,
    fancyBoarder
 }) => {


    return (
        <BoatsList
            boats={boats}
            heading={heading}
            subHeading={subHeading}
            fancyBoarder={fancyBoarder} 
        />
    );

};

export default NewBoats;