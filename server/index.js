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

console.log(process.env.NODE_ENV)

app.get('*', (req, res) => {
    const formats = ['.js', '.css', '.ico', '.jpg', '.png']

    if (formats.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`public/build/${req.url}`));
    } else {
        res.sendFile(path.join(__dirname, 'public/build/index.html'));
    }
});

databaseInit(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, () => console.log(`App listen in port: ${config.PORT}...`));
    })
    .catch(err => console.log('Database init is failed!', err));

