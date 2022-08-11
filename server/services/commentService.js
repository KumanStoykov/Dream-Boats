const Comment = require('../models/Comment');

exports.getAll = () => Comment.find({}).sort({ createdAt: 'desc' });

exports.getOne = (commentId) => Comment.findById(commentId);

exports.getLastComment = () => Comment.find({}).sort({ createdAt: 'desc' }).limit(1);

exports.create = (commentData) => Comment.create(commentData);

exports.edit = async (commentId, data) => {
    const comment = await Comment.findById(commentId);

    Object.assign(comment, data);

    return comment.save();
};

exports.commentDelete = (commentId) => Comment.findByIdAndDelete(commentId);