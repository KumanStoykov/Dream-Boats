const boatService = require('../services/boatService');
const { jwtVerify } = require('../utils/jwtUtils');

const { COOKIE_TOKEN_NAME, SECRET } = require('../config');

module.exports = () => async (req, res, next) => {
    const token = req.cookies[COOKIE_TOKEN_NAME];

    try {
        const user = await jwtVerify(token, SECRET);

        const boat = await boatService.getOne(req.params.boatId);
        
        const isOwn = user._id == boat.owner._id;

        if (isOwn) {
            next();
        } else {
            throw new Error('Not authorized');
        }

    } catch (error) {
        res.status(401).send({ message: error.message });
    }

}