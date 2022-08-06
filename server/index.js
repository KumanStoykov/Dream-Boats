const express = require('express');
const router = express.Router();
const path = require('path');
require('dotenv').config();

const cloudinary = require('cloudinary').v2;

const config = require('./config');
const expressInit = require('./config/express');
const databaseInit = require('./config/database');

const app = express();

expressInit(app);


cloudinary.config(config.CLOUDINARY);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

databaseInit(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, () => console.log(`App listen in port: ${config.PORT}...`));
    })
    .catch(err => console.log('Database init is failed!', err));

