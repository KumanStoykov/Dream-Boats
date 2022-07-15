const Boat = require('../models/Boat');


exports.getOne = (id) => Boat.findById(id);

exports.getAllBoats = (page) => Boat.find().skip(page * 12).limit(12);

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

    return Boat.find({...search, price: { $gt: priceFrom, $lt: priceTo }}).skip(page * 12).limit(12);
}

exports.create = (boatData) => Boat.create(boatData);