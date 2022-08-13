const Boat = require('../models/Boat');


exports.getAllBoats =
    (page, sort, search) =>
        Boat
            .find({ ...search })
            .sort({ createdAt: sort })
            .skip(page * 6)
            .limit(6);




exports.getByOwner =
    (whereId, page, sort) =>
        Boat
            .find({ owner: whereId })
            .sort({ createdAt: sort })
            .skip(page * 6)
            .limit(6);

exports.boatCount = (search) => Boat.countDocuments({ ...search });

exports.getLastThree = (sort) => Boat.find({}).sort({ createdAt: sort }).limit(3);

exports.getOne = (boatId) => Boat.findById(boatId);


exports.create = (boatData) => Boat.create(boatData);

exports.edit = async (boatId, boatData) => {
    const boat = await Boat.findById(boatId);

    Object.assign(boat, boatData);
    return boat.save();
};

exports.deleteBoat = (boatId) => Boat.findByIdAndDelete(boatId);