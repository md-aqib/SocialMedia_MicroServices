const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, auto: true },
    name: String,
    email: String,
    password: String,
    passwordText: String,
    mobile: String,
    dob: Number,
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
