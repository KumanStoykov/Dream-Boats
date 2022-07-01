const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    about: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    fuel: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Boat = mongoose.model('Boat', boatSchema);

module.exports = Boat;