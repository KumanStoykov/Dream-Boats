const router = require('express').Router();
const formidable = require('formidable');
const validator = require('validator').default;
const cloudinary = require('cloudinary').v2;

const boatService = require('../services/boatService');
const formidableFormData = require('../utils/formidableFormData');
const checkCredential = require('../middleware/checkCredentialMiddleware');
const loggedInMiddleware = require('../middleware/loggedInMiddleware');
const isOwnerMiddleware = require('../middleware/isOwnerMiddleware');


router.get('/', async (req, res) => {
    try {

        const page = Number(req.query.page) - 1 || 0;

        const boats = await boatService.getAllBoats(page);

        res.status(200).send({ boats });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/getLastThree', async (req, res) => {
    try {

        const boats = await boatService.getLastThree();
        res.status(200).send({ boats });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/boats-owner', async (req, res) => {
    const { whereId, sort } = req.query;
    try {

        const boats = await boatService.getByOwner(whereId, sort);

        res.status(200).send({ boats });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/:boatId', async (req, res) => {
    const boatId = req.params.boatId;
    try {

        const boat = await boatService.getOne(boatId);

        res.status(200).send({ boat });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/', loggedInMiddleware(), async (req, res) => {
    const form = formidable({ multiples: true });
    const imagesUrl = [];

    try {
        const [formData, incFiles] = await formidableFormData(req, form);

        const valueIncFile = Object.values(incFiles);

        const enterableValue = valueIncFile.length > 1 ? valueIncFile : valueIncFile[0];

        for (const image of enterableValue) {
            const res = await cloudinary.uploader.upload(image._writeStream.path);

            imagesUrl.push({ url: res.url, public_id: res.public_id });
        }

        const boatData = {
            make: formData.make,
            model: formData.model,
            type: formData.type,
            condition: formData.condition,
            boatLength: formData.boatLength,
            year: formData.year,
            fuel: formData.fuel,
            engineMake: formData.engineMake,
            hullMaterial: formData.hullMaterial,
            price: formData.price,
            description: formData.description,
            location: formData.location,
            image: imagesUrl,
            owner: req.user._id
        };

        if (!validator.isLength(boatData.make, { min: 3 })) {
            throw new Error('The make should be at least 3 characters long');
        }
        if (!validator.isLength(boatData.model, { min: 3 })) {
            throw new Error('The model should be at least 3 characters long');
        }
        if (!validator.matches(boatData.type, /Yacht|Motorboat|Sailboat/i)) {
            throw new Error('The type should be one from Yacht, Motorboat, Sailboat');
        }
        if (!validator.matches(boatData.condition, /Old|New/i)) {
            throw new Error('The condition should be one from Old or New');
        }
        if (!validator.isLength(boatData.boatLength, { min: 1 })) {
            throw new Error('A value is required, this field can\'t be empty');
        }
        if (!validator.isInt(boatData.year, { min: 1960, max: 2022 })) {
            throw new Error('The year should be between 1960 and 2022');
        }
        if (!validator.matches(boatData.fuel, /Benzin|Diesel/i)) {
            throw new Error('The make should be one from Benzin, Diesel');
        }
        if (!validator.isLength(boatData.location, { min: 3 })) {
            throw new Error('The location should be at least 2 characters long');
        }
        if (!validator.isLength(boatData.engineMake, { min: 3 })) {
            throw new Error('The engineMake should be at least 3 characters long');
        }
        if (!validator.isLength(boatData.hullMaterial, { min: 2 })) {
            throw new Error('The hullMaterial should be at least 2 characters long');
        }
        if (!validator.isInt(boatData.price)) {
            throw new Error('A value is required, this field can\'t be empty');
        }
        if (!validator.isLength(boatData.description, { min: 20 })) {
            throw new Error('The description should be at least 20 characters long');
        }

        const boat = await boatService.create(boatData);
        res.status(200).send({ boat });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.put('/:boatId', isOwnerMiddleware(), loggedInMiddleware(), async (req, res) => {
    const form = formidable({ multiples: true });
    const imagesUrl = [];
    const boatId = req.params.boatId;
    const oldBoat = await boatService.getOne(boatId);

    try {
        const [formData, incFiles] = await formidableFormData(req, form);

        const valueIncFile = Object.values(incFiles);

        const enterableValue = valueIncFile?.length > 0 ? valueIncFile : valueIncFile[0];

        if (enterableValue?.length > 0) {
            for (const image of enterableValue) {
                const res = await cloudinary.uploader.upload(image._writeStream.path);

                imagesUrl.push({ url: res.url, public_id: res.public_id });
            }
            for (const image of oldBoat.image) {

                await cloudinary.uploader.destroy(image.public_id);
            }
        }
        const loadImages = imagesUrl.length > 0 ? imagesUrl : oldBoat.image

        const boatData = {
            make: formData.make,
            model: formData.model,
            type: formData.type,
            condition: formData.condition,
            boatLength: formData.boatLength,
            year: formData.year,
            fuel: formData.fuel,
            engineMake: formData.engineMake,
            hullMaterial: formData.hullMaterial,
            price: formData.price,
            description: formData.description,
            location: formData.location,
            image: loadImages,
            owner: req.user._id
        };

        if (!validator.isLength(boatData.make, { min: 3 })) {
            throw new Error('The make should be at least 3 characters long');
        }
        if (!validator.isLength(boatData.model, { min: 3 })) {
            throw new Error('The model should be at least 3 characters long');
        }
        if (!validator.matches(boatData.type, /Yacht|Motorboat|Sailboat/i)) {
            throw new Error('The type should be one from Yacht, Motorboat, Sailboat');
        }
        if (!validator.matches(boatData.condition, /Old|New/i)) {
            throw new Error('The condition should be one from Old or New');
        }
        if (!validator.isLength(boatData.boatLength, { min: 1 })) {
            throw new Error('A value is required, this field can\'t be empty');
        }
        if (!validator.isInt(boatData.year, { min: 1960, max: 2022 })) {
            throw new Error('The year should be between 1960 and 2022');
        }
        if (!validator.matches(boatData.fuel, /Benzin|Diesel/i)) {
            throw new Error('The make should be one from Benzin, Diesel');
        }
        if (!validator.isLength(boatData.location, { min: 3 })) {
            throw new Error('The location should be at least 2 characters long');
        }
        if (!validator.isLength(boatData.engineMake, { min: 3 })) {
            throw new Error('The engineMake should be at least 3 characters long');
        }
        if (!validator.isLength(boatData.hullMaterial, { min: 2 })) {
            throw new Error('The hullMaterial should be at least 2 characters long');
        }
        if (!validator.isInt(boatData.price)) {
            throw new Error('A value is required, this field can\'t be empty');
        }
        if (!validator.isLength(boatData.description, { min: 20 })) {
            throw new Error('The description should be at least 20 characters long');
        }

        const boat = await boatService.edit(boatId, boatData);
        res.status(200).send({ boat });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


module.exports = router;