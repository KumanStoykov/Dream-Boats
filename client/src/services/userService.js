const BASE_URL = process.env.REACT_APP_SERVER_API_URL;


const checkUser = () => {
    const options = {
        url: `${BASE_URL}/user/check-user`,
    };

    return options;

};

const getUserById = (userId) => {
    const options = {
        url: `${BASE_URL}/user/getUserById${userId}`,
        method: 'GET'
    }
    return options;
}

const register = (firstName, lastName, email, phone, password, repeatPassword) => {
    const options = {
        url: `${BASE_URL}/user/register`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            password,
            repeatPassword
        })
    };

    return options;
};

const login = (email, password) => {
    const options = {
        url: `${BASE_URL}/user/login`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })

    };
    return options;
};

const edit = (firstName, lastName, email, phone, userId) => {
    const options = {
        url: `${BASE_URL}/user/${userId}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
        })
    };

    return options;

};

const deleteUser = (userId) => {
    const options = {
        url: `${BASE_URL}/user/${userId}`,
        method: 'DELETE',
    };

    return options;

};

const logout = () => {
    return { url: `${BASE_URL}/user/logout` };
};

const userRequestOptions = {
    getUserById,
    checkUser,
    register,
    login,
    edit,
    deleteUser,
    logout
};

export default userRequestOptions;