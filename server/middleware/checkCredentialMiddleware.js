const { jwtVerify } = require('../utils/jwtUtils');

const { COOKIE_TOKEN_NAME, SECRET } = require('../config');

module.exports = () => (req, res, next) => {
    const token = req.cookies[COOKIE_TOKEN_NAME];

    try{
        const decodedToken = jwtVerify(token, SECRET);
        
        req.decodedToken = decodedToken;
        next();
    } catch(error) {
        res.decodedToken = undefined;
        next();
    }
}