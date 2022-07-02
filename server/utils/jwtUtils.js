const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');

exports.createToken = (user) => {
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, {expiresIn: '1d'}, (err, token) => {
            if(err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });

};

exports.jwtVerify = (token) => {

    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (err, decodedToken) => {
            if(err) {
                reject(err);
            } else {
                resolve(decodedToken);
            }
        });
    });
};