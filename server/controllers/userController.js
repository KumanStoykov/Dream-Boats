const router = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator').default;

const { TOKEN_NAME, ROUND_SALT } = require('../config');
const userService = require('../services/userService');
const jwt = require('../utils/jwtUtils');
const { isUser, isAuth } = require('../middlewares/authMiddleware');
const { userPayload } = require('../utils/userPayload');


router.post('/register', isUser, async (req, res) => {
    try {
        const firstName = req.body.firstName.trim();
        const lastName = req.body.lastName.trim();
        const email = req.body.email.trim();
        const password = req.body.password.trim();
        const repeatPassword = req.body.repeatPassword.trim();


        if (!validator.isLength(firstName, { min: 4 })) {
            throw new Error('The first name should be at least 4 characters long');
        }
        if (!validator.isEmail(email)) {
            throw new Error('The email should be in correct format');
        }
        if (!validator.isLength(password, { min: 5 })) {
            throw new Error('The password should be at least 5 characters long');
        }
        if (!validator.equals(password, repeatPassword)) {
            throw new Error('The repeat password should be equal to the password');
        }

        const checkEmailUser = await userService.getByEmail(email);

        if (checkEmailUser) {
            throw new Error('Email is taken');
        }

        const hashPass = await bcrypt.hash(password, ROUND_SALT);

        const user = await authService.register(firstName, lastName, email, hashPass);


        const token = await jwt.createToken(user);

        res.cookie(TOKEN_NAME, token, { httpOnly: true });

        const sendData = userPayload(user);

        res.status(200).send(sendData);

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/login', isUser, async (req, res) => {
    try {
        const email = req.body.email.trim();
        const password = req.body.password.trim();

        if (!validator.isEmail(email)) {
            throw new Error('The email should be in correct format');
        }
        if (!validator.isLength(password, { min: 5 })) {
            throw new Error('The password should be at least 5 characters long');
        }

        const user = await userService.getByEmail(email);

        if (!user) {
            throw new Error('Email or password don\'t match');
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw new Error('Email or password don\'t match');
        }

        const token = await jwt.createToken(user);

        res.cookie(TOKEN_NAME, token, { httpOnly: true });

        const sendData = userPayload(user);

        res.status(200).send(sendData);

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(TOKEN_NAME);
    res.status(200).send({ message: 'Secssful logged out' });
});

module.exports = router;