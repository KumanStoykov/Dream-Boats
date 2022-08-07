const BASE_URL = process.env.REACT_APP_SERVER_API_URL;

const getAll = (search) => {
    const options = {
        url: `${BASE_URL}/boat${search}`
    };
    return options;
};

const getLastThree = () => {
    const options = {
        url: `${BASE_URL}/boat/getLastThree?sort=desc`
    };
    return options;
};

const getOneById = (id) => {
    const options = {
        url: `${BASE_URL}/boat/${id}`
    };
    return options;
};

const getByOwner = (query) => {
    const options = {
        url: `${BASE_URL}/boat/boats-owner${query}`
    };
    return options;
};

const create = (data) => {
    const options = {
        url: `${BASE_URL}/boat`,
        method: 'POST',       
        body: data
    };

    return options;
};

const edit = (boatId, data) => {
    const options = {
        url: `${BASE_URL}/boat/${boatId}`,
        method: 'PUT',       
        body: data
    };

    return options;
};
const deleteBoat = (boatId) => {
    const options = {
        url: `${BASE_URL}/boat/${boatId}`,
        method: 'DELETE'       
    };

    return options;
};

const boatService = {
    getAll,
    getOneById,
    getLastThree,
    getByOwner,
    create,
    edit,
    deleteBoat
};

export default boatService;