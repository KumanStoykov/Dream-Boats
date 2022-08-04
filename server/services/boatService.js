const Boat = require('../models/Boat');


exports.getAllBoats = (page) => Boat.find({}).sort({ createdAt: 'descending' }).skip(page * 9).limit(9);

exports.getByOwner = (whereId, page) => Boat.find({ owner: whereId }).sort({ createdAt: 'descending' }).skip(page * 9).limit(9);

exports.boatCount = () => Boat.countDocuments({}); 

exports.getLastThree = () => Boat.find({}).sort({ createdAt: 'descending' }).limit(3);

exports.getOne = (boatId) => Boat.findById(boatId);


exports.getBoatBySearch = (category, fuel, priceFrom, priceTo, page) => {

    let search = {};

    if (category) {
        search.category = category;
    }
    if (fuel) {
        search.fuel = fuel;
    }
    //TODO:
    // if (priceFrom) {
    //     search.price = priceFrom;
    // }   

    return Boat.find({ ...search, price: { $gt: priceFrom, $lt: priceTo } }).skip(page * 12).limit(12);
}

exports.create = (boatData) => Boat.create(boatData);

exports.edit = (boatId, boatData) => Boat.findByIdAndUpdate(boatId, boatData);

exports.deleteBoat = (boatId) => Boat.findByIdAndDelete(boatId);