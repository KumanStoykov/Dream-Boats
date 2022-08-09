const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true   
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

commentSchema.set('timestamps', true);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;