const BASE_URL = process.env.REACT_APP_SERVER_API_URL;

const sendMail = (name, email, phone, message, ownerId) => {
    const options = {
        url: `${BASE_URL}/email/send/${ownerId}`,
        method: 'POST',       
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            phone,
            message,
            
        })
    };

    return options;
};

const emailRequestOptions = {
    sendMail
};

export default emailRequestOptions;