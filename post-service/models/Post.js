const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Post', postSchema);
