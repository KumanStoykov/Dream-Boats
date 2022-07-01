const express = require('express');

const config = require('./config');
const expressInit = require('./config/express');
const databaseInit = require('./config/database');

const app = express();

expressInit(app);



databaseInit(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, console.log.bind(`App listen in port: ${config.PORT}...`));
    })
    .catch(err => console.log('Database init is failed!', err));

