const User = require('../models/User');


exports.getByEmail = (email) => User.findOne({ email });

exports.getById = (id) => User.findById(id);

exports.createUser = (firstName, lastName, email, phone, password) => User.create({ firstName, lastName, email, phone, password });

exports.editUser = async (firstName, lastName, email, phone, userId) => {
   const user = await User.findById(userId);

   Object.assign(user, { firstName, lastName, email, phone });
    return user.save();
}; 