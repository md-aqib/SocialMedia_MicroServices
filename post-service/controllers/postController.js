const { Types } = require('mongoose')
const postModel = require('../models/post');


const addPost = async (req, res) => {
    const { title, content, userId } = req.body;
    const post = new postModel({ title, content, userId });
    await post.save();
    res.status(201).send(post);
};

const postList = async (req, res) => {
    const posts = await postModel.find();
    res.status(200).send(posts);
}

module.exports = {
    addPost,
    postList
};