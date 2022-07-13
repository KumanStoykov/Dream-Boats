const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
    make: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    condition: {
        type: String,
        require: true
        //Old or new 
    },
    length: {
        type: Number,
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
    engineMake: {
        type: String,
        require: true
    },
    hullMaterial: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: [
        {
            type: {
                url: {
                    type: String
                },
                public_id: {
                    type: String
                }
            }
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Boat = mongoose.model('Boat', boatSchema);

module.exports = Boat;