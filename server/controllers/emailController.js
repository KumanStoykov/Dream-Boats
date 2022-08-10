const router = require('express').Router();
const sgMail = require('@sendgrid/mail');

const userService = require('../services/userService');

const config = require('../config');



router.post('/send/:ownerId', async (req, res) => {
    sgMail.setApiKey(config.SENDGRID_API_KEY);
    try {
        const user = await userService.getById(req.params.ownerId);

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

        const result = await sgMail.send(msg);

        res.status(200).json({ statusCode: result[0].statusCode });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;