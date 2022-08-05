const Boat = require('../models/Boat');


exports.getAllBoats =
    (page, sort, search) =>
        Boat
            .find({ ...search })
            .sort({ createdAt: sort })
            .skip(page * 9)
            .limit(9);



exports.getByOwner =
    (whereId, sort, page) =>
        Boat
            .find({ owner: whereId })
            .sort({ createdAt: sort })
            .skip(page * 9)
            .limit(9);

exports.boatCount = (search) => Boat.countDocuments({ ...search });

exports.getLastThree = (sort) => Boat.find({}).sort({ createdAt: sort }).limit(3);

exports.getOne = (boatId) => Boat.findById(boatId);


exports.create = (boatData) => Boat.create(boatData);

exports.edit = (boatId, boatData) => Boat.findByIdAndUpdate(boatId, boatData);

exports.deleteBoat = (boatId) => Boat.findByIdAndDelete(boatId);