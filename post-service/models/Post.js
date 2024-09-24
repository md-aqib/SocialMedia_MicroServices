const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: { type: mongoose.Types.ObjectId, auto: true },
    title: String,
    content: String,
    userId: mongoose.Types.ObjectId,
    userName: String,
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
