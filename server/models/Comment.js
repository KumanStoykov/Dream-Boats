const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;