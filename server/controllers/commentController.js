const router = require('express').Router();
const validator = require('validator').default;

const commentService = require('../services/commentService');

const checkCredential = require('../middleware/checkCredentialMiddleware');
const loggedInMiddleware = require('../middleware/loggedInMiddleware');
const isCommentCreatorMiddleware = require('../middleware/isCommentCreatorMiddleware');

router.get('/', checkCredential(), async (req, res) => {
    try {
        const comments = await commentService.getAll();

        res.status(200).send({ comments });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/get-last-comment', checkCredential(), async (req, res) => {

    try {
        const comment = await commentService.getLastComment();
        const result = comment[0] || null;

        res.status(200).send({ comment: result });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/:ownerId', loggedInMiddleware(), async (req, res) => {
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

        const comment = await commentService.create(commentData);
        
        res.status(200).send({ comment });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.put('/:commentId', loggedInMiddleware(), isCommentCreatorMiddleware(), async (req, res) => {

    const commentId = req.params.commentId;
    try {
        const commentData = {
            name: req.body.name,
            comment: req.body.comment,
            rating: req.body.rating,
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

        const comment = await commentService.edit(commentId, commentData);
        
        res.status(200).send({ comment });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.delete('/:commentId', loggedInMiddleware(), isCommentCreatorMiddleware(), async (req, res) => {
    const commentId = req.params.commentId;
    try {    

        const comment = await commentService.commentDelete(commentId);
        
        res.status(200).send({ _id: comment._id });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;