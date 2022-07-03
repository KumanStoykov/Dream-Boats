const router = require('express').Router();

const userController = require('../controllers/userController');
const boatController = require('../controllers/boatController');
const commentController = require('../controllers/commentController');
const messageController = require('../controllers/contactMessageController');

router.use('/user', userController);
router.use('/boat', boatController);
router.use('/comment', commentController);
router.use('/message', messageController);


module.exports = router;