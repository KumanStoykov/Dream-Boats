const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const config = require('./index');
const router = require('./router');

module.exports = (app) => {

    // app.use(express.static('public'));

    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());
    
    app.use(cookieParser());

    app.use(cors(config.CORS));
    
    app.use(router);
}