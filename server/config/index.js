const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env')});


const configEnv = {
    development: {
        PORT: process.env.PORT || 5000,
        DB_CONNECTION_STRING: 'mongodb://localhost:27017/dreamBoats',
        COOKIE_TOKEN_NAME: 'X-Authorization',
        SECRET: '07505766beb4ea7ea441c0f0481799cee1c08b96c38b4f2ba427671ce5a6fa25fd9246fc841ae8b088bb35cb4d3d182d6ce8edf61ffc73daf05f07931b919e35',
        ROUND_SALT: 9,
        CORS: {
            origin: ['http://localhost:3000'],
            credentials: true
        },
        CLOUDINARY: {
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME 
        }
    },
    production: {
        PORT: process.env.PORT || 80,
        DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
        COOKIE_TOKEN_NAME: process.env.COOKIE_TOKEN_NAME,
        SECRET: process.env.SECRET,
        ROUND_SALT: process.env.ROUND_SALT,
        CORS: {
            origin: [],
            credentials: true
        },
        CLOUDINARY: {
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME
        }
    }

};

module.exports = configEnv[process.env.NODE_ENV || 'development'];
