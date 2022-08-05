const router = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator').default;

const { COOKIE_TOKEN_NAME, ROUND_SALT } = require('../config');
const userService = require('../services/userService');
const jwt = require('../utils/jwtUtils');
const { userPayload } = require('../utils/userPayload');


router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getById(userId);

        res.status(200).send({ user });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const firstName = req.body.firstName.trim();
        const lastName = req.body.lastName.trim();
        const email = req.body.email.trim();
        const phone = req.body.phone.trim();
        const password = req.body.password.trim();
        const repeatPassword = req.body.repeatPassword.trim();


        if (!validator.isLength(firstName, { min: 4 })) {
            throw new Error('The first name should be at least 4 characters long');
        }
        if (!validator.isLength(lastName, { min: 4 })) {
            throw new Error('The last name should be at least 4 characters long');
        }
        if (!validator.isEmail(email)) {
            throw new Error('The email should be in correct format');
        }
        if (!validator.isMobilePhone(phone)) {
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

        const user = await userService.createUser(firstName, lastName, email, phone, hashPass);


        const token = await jwt.createToken(user);

        res.cookie(COOKIE_TOKEN_NAME, token, { httpOnly: true });

        const userData = userPayload(user);

        res.status(200).send({ userData });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
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

        res.cookie(COOKIE_TOKEN_NAME, token, { httpOnly: true });

        const userData = userPayload(user);

        res.status(200).send({ userData });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.put('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const firstName = req.body.firstName.trim();
        const lastName = req.body.lastName.trim();
        const email = req.body.email.trim();
        const phone = req.body.phone.trim();

        if (!validator.isLength(firstName, { min: 4 })) {
            throw new Error('The first name should be at least 4 characters long');
        }
        if (!validator.isLength(lastName, { min: 4 })) {
            throw new Error('The last name should be at least 4 characters long');
        }
        if (!validator.isEmail(email)) {
            throw new Error('The email should be in correct format');
        }
        if (!validator.isMobilePhone(phone)) {
            throw new Error('The email should be in correct format');
        }

        const user = await userService.editUser(firstName, lastName, email, phone, userId);

        const userData = userPayload(user);

        res.status(200).send({ userData });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        res.clearCookie(COOKIE_TOKEN_NAME);
        const userId = req.params.userId;

        await userService.deleteUser(userId);

        res.status(200).send({ message: 'User secssful deleted!' });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_TOKEN_NAME);
    res.status(200).send({ message: 'Secssful logged out' });
});

module.exports = router;