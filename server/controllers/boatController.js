const router = require('express').Router();
const formidable = require('formidable');
const validator = require('validator').default;

const boatService = require('../services/boatService');
const formidableFormData = require('../utils/formidableFormData');
const { uploadFile, deleteFile } = require('../utils/cloudinaryUtils');
const checkCredential = require('../middleware/checkCredentialMiddleware');
const loggedInMiddleware = require('../middleware/loggedInMiddleware');


router.get('/', async (req, res) => {
    try {
        const page = Number(req.query.page) - 1 || 0;

        const allBoats = await boatService.getAllBoats(page);

        res.status(200).send({ allBoats })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const form = formidable({ multiples: true });
    const imagesUrl = [];

    try {
        const [formData, incFiles] = await formidableFormData(req, form);

        if(incFiles.length > 0){
            Object.values(incFiles).forEach(element => {
                uploadFile(element.path)
                    .then(imageRes => {
                        imagesUrl.push({ url: imageRes.url, public_id: imageRes.public_id });
                    });
            });
        }

        const boatData = {
            category: formData.body.category,
            model: formData.body.model,
            price: formData.body.price,
            description: formData.body.description,
            year: formData.body.year,
            fuel: formData.body.fuel,
            location: formData.body.location,
            image: formData.body.image,
            owner: formData.user._id
        };

        if (!validator.matches(boatData.category, /Yacht|Motorboat|Sailboat/i)) {
            throw new Error('The category should be one from Yacht, Motorboat, Sailboat');
        }
        if (!validator.isLength(boatData.model, { min: 3 })) {
            throw new Error('The last name should be at least 3 characters long');
        }
        if (!validator.isInt(boatData.price, { min: 1, })) {
            throw new Error('The price should be positive number');
        }
        if (!validator.isLength(boatData.description, { min: 20 })) {
            throw new Error('The description should be at least 20 characters long');
        }
        if (!validator.isInt(boatData.year, { min: 1960, max: 2022 })) {
            throw new Error('The year should be between 1960 and 2022');
        }
        if (!validator.matches(boatData.fuel, /Benzin|Diesel/i)) {
            throw new Error('The category should be one from Yacht, Motorboat, Sailboat');
        }
        if (!validator.isLength(boatData.location, { min: 3 })) {
            throw new Error('he location should be at least 20 characters long');
        }

        const boat = await boatService.create(boatData);
        res.status(200).send(boat);

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;
