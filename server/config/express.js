const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const path = require('path');

const config = require('./index');

module.exports = (app) => {

    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());
    
    app.use(cookieParser());

    app.use(cors(config.CORS));
}