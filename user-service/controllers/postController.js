const { Types } = require('mongoose')
const userModel = require('../models/user');


const registerUser = async (req, res) => {
    const { name, email } = req.body;
    const user = new userModel({ name, email });
    await user.save();
    res.status(201).send(user);
}

const userProfile = async (req, res) => {
    const posts = await userModel.findOne({});
    res.status(200).send(posts);
}

module.exports = {
    registerUser
};