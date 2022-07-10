const BASE_URL = 'http://localhost:5000';

const getAll = () => {
    const options = {
        url: `${BASE_URL}/boat`
    };
    return options;
}

const create = (
    category,
    model,
    price, 
    description, 
    year,
    fuel,
    location,
    image    
    ) => {
    const options = {
        url: `${BASE_URL}/boat`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category,
            model,
            price, 
            description, 
            year,
            fuel,
            location,
            image 
        })
    };

    return options;
};

const boatService = {
    getAll,
    create
};

export default boatService;