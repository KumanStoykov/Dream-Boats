const boatService = require('../services/boatService');


exports.isOwner = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const boat = await boatService.getOne(req.params.id);

        const isOwn = userId == boat.owner._id;

        if (isOwn) {
            next();
        } else {
            throw new Error('Not authorized');
        }

    } catch (error) {
        res.status(401).send({ message: error.message });
    }

}