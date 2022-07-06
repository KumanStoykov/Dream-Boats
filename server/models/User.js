const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    message: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Message'
        }
    ],  
});

const User = mongoose.model('User', userSchema);

module.exports = User;