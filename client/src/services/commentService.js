const BASE_URL = process.env.REACT_APP_SERVER_API_URL;

const getComments = () => {
    const options = {
        url: `${BASE_URL}/comment`
    }
    return options;
};

const createComment = (name, comment, rating, ownerId) => {
    const options = {
        url: `${BASE_URL}/comment/create/${ownerId}`,
        method: 'POST',       
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            comment,
            rating
            
        })
    };

    return options;
};

const emailRequestOptions = {
    getComments,
    createComment
};

export default emailRequestOptions;