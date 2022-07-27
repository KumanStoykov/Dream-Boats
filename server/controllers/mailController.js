const router = require('express').Router();
const sgMail = require('@sendgrid/mail');

const config = require('../config');



router.post('/', async (req, res) => {
    sgMail.setApiKey(config.SENDGRID_API_KEY);
    try {
        const msg = {
            from: {
                name: 'Dream boats',
                email: 'dreamboats2022@gmail.com'
            },
            personalizations: [{
                to: req.body.to,
                dynamicTemplateData: {
                    subject: req.body.subject,
                    name: `${req.body.firstName} ${req.body.lastName}`,
                    text: req.body.text,
                    email: req.body.email,
                    tel: req.body.tel
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