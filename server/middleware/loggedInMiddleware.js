const { jwtVerify } = require('../utils/jwtUtils');

const { COOKIE_TOKEN_NAME, SECRET } = require('../config');

module.exports = () => async (req, res, next) => {
    const token = req.cookies[COOKIE_TOKEN_NAME];
    try {
        const user = await jwtVerify(token, SECRET);

        req.user = user;

        next();
    } catch (error) {
        res.clearCookie(COOKIE_TOKEN_NAME);
        res.status(401).send({ message: 'Please log in' });
    }
}