const express = require('express');
const router = express.Router();

const cloudinary = require('cloudinary').v2;

const config = require('./config');
const expressInit = require('./config/express');
const databaseInit = require('./config/database');

const app = express();

expressInit(app);


cloudinary.config(config.CLOUDINARY);


databaseInit(config.DB_CONNECTION_STRING)
    .then(() => {
        router.get('*', (req, res) => {

            const formats = ['.js', '.css', '.ico', '.jpg', '.png']

            if (formats.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
                res.sendFile(path.resolve(`public/${req.url}`));
            } else {
                res.sendFile(path.join(__dirname, "public/index.html"));
            }
        });
        app.listen(config.PORT, () => console.log(`App listen in port: ${config.PORT}...`));
    })
    .catch(err => console.log('Database init is failed!', err));

