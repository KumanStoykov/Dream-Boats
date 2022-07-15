import validator from 'validator';

const isLength = (value) => validator.isLength(value, { min: 3 });

const descriptionLength = (value) => validator.isLength(value, { min: 20 });

const numberCheck = (value) => validator.isInt(value);

const stringFormat = (value) => validator.matches(value, /^[a-zA-Z,]+$/);

const boatValidation = {
    isLength,
    descriptionLength,
    numberCheck,
    stringFormat
};

export default boatValidation;