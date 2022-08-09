const router = require('express').Router();
const validator = require('validator').default;

const commentService = require('../services/commentService');


router.get('/', async (req, res) => {
    try {
        const comments = await commentService.getAll();

        res.status(200).send({ comments });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/create/:ownerId', async (req, res) => {
    const ownerId = req.params.ownerId;
    try {
        const commentData = {
            name: req.body.name,
            comment: req.body.comment,
            rating: req.body.rating,
            creator: ownerId
        };
        
        if (!validator.isLength(commentData.name, { min: 2 })) {
            throw new Error('The name should be at least 2 characters long');
        }
        if (!validator.isLength(commentData.comment, { min: 5 })) {
            throw new Error('The comment should be at least 5 characters long');
        }
        if (validator.isEmpty(commentData.rating)) {
            throw new Error('Rating is required');
        }

        const comment = commentService.create(commentData);

        res.status(200).send({ comment });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;