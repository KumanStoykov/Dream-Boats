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
    },
    boatLength: {
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
            url: {
                type: String
            },
            public_id: {
                type: String
            }
        }

    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    
});

boatSchema.set('timestamps', true);


const Boat = mongoose.model('Boat', boatSchema);

module.exports = Boat;