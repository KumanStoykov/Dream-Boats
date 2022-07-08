const BASE_URL = 'http://localhost:5000';

const register = (firstName, lastName, email, password, repeatPassword) => {
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
}

const logout = () => {
    return { url: `${BASE_URL}/user/logout` };
}

const userRequestOptions = {
    register,
    login,
    logout
}

export default userRequestOptions;