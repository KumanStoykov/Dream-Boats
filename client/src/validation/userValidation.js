import validator from 'validator';

const emailIsValid = (value) => validator.isEmail(value);

const passwordIsLength = (value) => validator.isLength(value, { min: 5 });

const nameIsLength = (value) => validator.isLength(value, { min: 4 });

const isEqual = (pass, rePass) => validator.equals(pass, rePass);

const userValidation = {
    emailIsValid,
    passwordIsLength,
    nameIsLength,
    isEqual
};

export default userValidation;