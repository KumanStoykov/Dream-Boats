const BASE_URL = 'http://localhost:5000';

const getUser = (userId) => {
    const options = {
        url: `${BASE_URL}/user/${userId}`,
    };
    return options;
};

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

}

const logout = () => {
    return { url: `${BASE_URL}/user/logout` };
}

const userRequestOptions = {
    getUser,
    register,
    login,
    edit,
    logout
};

export default userRequestOptions;