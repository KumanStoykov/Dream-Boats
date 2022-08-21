const router = require('express').Router();
const sgMail = require('@sendgrid/mail');
const validator = require('validator').default;

const userService = require('../services/userService');

const config = require('../config');



router.post('/send/:ownerId', async (req, res) => {
    sgMail.setApiKey(config.SENDGRID_API_KEY);
    try {
        const userId = req.params.ownerId;

        const user = await userService.getById(userId);

        const msg = {
            from: {
                name: 'Dream boats',
                email: 'dreamboats2022@gmail.com'
            },
            personalizations: [{
                to: user.email,
                dynamicTemplateData: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    message: req.body.message,
                }

            }],
            template_id: 'd-422ed513916d413b87636119f1c7527d'
        };

        if (validator.isEmpty(req.body.name)) {
            throw new Error('The name is required');
        }
        if (validator.isEmpty(req.body.email)) {
            throw new Error('The email is required');
        }
        if (validator.isEmpty(req.body.phone)) {
            throw new Error('The phone is required');
        }
        if (validator.isEmpty(req.body.message)) {
            throw new Error('The message is required');
        }


        const result = await sgMail.send(msg);

        res.status(200).json({ statusCode: result[0].statusCode });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;