const router = require('express').Router();

const userController = require('../controllers/userController');
const boatController = require('../controllers/boatController');
const emailController = require('../controllers/emailController');
const commentController = require('../controllers/commentController');


router.use('/user', userController);
router.use('/boat', boatController);
router.use('/email', emailController);
router.use('/comment', commentController);



module.exports = router;