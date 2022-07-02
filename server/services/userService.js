const User = require('../models/User');


exports.getByEmail = (email) => User.findOne({ email });
exports.getById = (id) => User.findById(id);

exports.createUser = (firstName, lastName, email, password) => User.create(firstName, lastName, email, password); 