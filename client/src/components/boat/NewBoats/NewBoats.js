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
            title={'No Boats yet'}
        />
    );

};

export default NewBoats;