const commentService = require('../services/commentService');
const { jwtVerify } = require('../utils/jwtUtils');

const { COOKIE_TOKEN_NAME, SECRET } = require('../config');


module.exports = () => async (req, res, next) => {
    const token = req.cookies[COOKIE_TOKEN_NAME];

    try {
        const user = await jwtVerify(token, SECRET);

        const comment = await commentService.getOne(req.params.commentId);
        
        const isCreator = user._id == comment.creator._id;

        if (isCreator) {
            next();
        } else {
            throw new Error('Not authorized');
        }

    } catch (error) {
        res.status(401).send({ message: error.message });
    }

}