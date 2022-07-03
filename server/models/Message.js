const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
    message: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

module.exports = ContactMessage;