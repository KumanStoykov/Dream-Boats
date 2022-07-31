const router = require('express').Router();

const userController = require('../controllers/userController');
const boatController = require('../controllers/boatController');
const mailController = require('../controllers/mailController')


router.use('/user', userController);
router.use('/boat', boatController);
router.use('/mail', mailController);



module.exports = router;