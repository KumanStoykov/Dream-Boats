import validator from 'validator';

const isLengthThreeCh = (value) => validator.isLength(value, { min: 3 });

const isLengthTwoCh = (value) => validator.isLength(value, { min: 2 });

const descriptionLength = (value) => validator.isLength(value, { min: 20 });

const checkYear = (value) => validator.isInt(value, { min: 1960, max: 2022 });

const isEmpty = (value) => !(validator.isEmpty(value));

const boatValidation = {
    isLengthThreeCh,
    isLengthTwoCh,
    descriptionLength,
    checkYear,
    isEmpty
};

export default boatValidation;