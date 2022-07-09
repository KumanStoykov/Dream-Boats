const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;