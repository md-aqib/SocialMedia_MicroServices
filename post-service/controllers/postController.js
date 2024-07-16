const { Types } = require('mongoose')
const postModel = require('../models/post');


const addPost = async (req, res) => {
    const { title, content, userId } = req.body;
    const post = new postModel({ title, content, userId });
    await post.save();
    res.status(201).send(post);
};

const postList = async (req, res) => {
  try {
    const posts = await Post.find();

    // Fetch user details for each post author
    const userServiceUrl = 'http://user-service:3000/users/';
    const postsWithUserDetails = await Promise.all(posts.map(async post => {
      const response = await axios.get(`${userServiceUrl}${post.author}`);
      const user = response.data;

      return {
        post,
        user
      };
    }));

    res.json(postsWithUserDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
}

module.exports = {
    addPost,
    postList
};