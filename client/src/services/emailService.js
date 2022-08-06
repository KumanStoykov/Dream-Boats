const BASE_URL = process.env.REACT_APP_SERVER_API_URL;

const sendMail = (name, email, phone, message, to) => {
    const options = {
        url: `${BASE_URL}/mail/send`,
        method: 'POST',       
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            phone,
            message,
            to
            
        })
    };

    return options;
};

const emailRequestOptions = {
    sendMail
};

export default emailRequestOptions;