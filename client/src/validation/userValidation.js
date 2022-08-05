import validator from 'validator';

const emailIsValid = (value) => validator.isEmail(value);

const isPhone = (value) => validator.isMobilePhone(value);

const passwordIsLength = (value) => validator.isLength(value, { min: 5 });

const nameIsLength = (value) => validator.isLength(value, { min: 2 });

const isEqual = (pass, rePass) => validator.equals(pass, rePass);

const isEmpty = (value) => !(validator.isEmpty(value));

const userValidation = {
    emailIsValid,
    isPhone,
    passwordIsLength,
    nameIsLength,
    isEqual,
    isEmpty
};

export default userValidation;