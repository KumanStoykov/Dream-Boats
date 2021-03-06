const BASE_URL = 'http://localhost:5000';

const getAll = () => {
    const options = {
        url: `${BASE_URL}/boat`
    };
    return options;
}

const getLastThree = () => {
    const options = {
        url: `${BASE_URL}/boat/getLastThree`
    };
    return options;
}
const getOneById = (id) => {
    const options = {
        url: `${BASE_URL}/boat/${id}`
    };
    return options;
}

const create = (data) => {
    const options = {
        url: `${BASE_URL}/boat`,
        method: 'POST',       
        body: data
    };

    return options;
};

const boatService = {
    getAll,
    getOneById,
    getLastThree,
    create
};

export default boatService;