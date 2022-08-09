const Comment = require('../models/Comment');

exports.getAll = () => Comment.find({}).sort({ createdAt: 'desc' });

exports.create = (data) => Comment.create(data);