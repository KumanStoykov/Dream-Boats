const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    firstLast: {
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
    contactOwner: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    watchedBoat: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Boat'
        }
    ],
    watchedItem: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Item'
        }
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;