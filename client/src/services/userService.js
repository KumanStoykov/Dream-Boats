const BASE_URL = 'http://localhost:5000';


const getUserById = (userId) => {
    const options = {
        url: `${BASE_URL}/user/${userId}`,
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
    register,
    login,
    edit,
    deleteUser,
    logout
};

export default userRequestOptions;