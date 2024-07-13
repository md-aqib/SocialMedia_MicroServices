const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.post('/', async (req, res) => {
    const { title, content, userId } = req.body;
    const post = new Post({ title, content, userId });
    await post.save();
    res.status(201).send(post);
});

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.status(200).send(posts);
});

module.exports = router;
