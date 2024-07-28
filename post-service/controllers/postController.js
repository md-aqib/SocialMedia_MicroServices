const { Types } = require('mongoose')
const postModel = require('../models/post');
const axios = require('axios')


const addPost = async (req, res) => {
    const { title, content, userId } = req.body;
    if(!title || !content || !userId) {
      return res.json({
        meta: { msg: "Missing parameter", status: false }
      })
    }
    const findPost = await postModel.findOne({ title });
    if(findPost) {
      return res.json({
        meta: { msg: "Post already exists..", status: false }
      })
    }
    const userServiceUrl = 'http://user-service:3000/users/getprofile?userId=';
    const response = await axios.get(`${userServiceUrl}${userId}`);
    if(!response) {
      return res.json({
        meta: { msg: "Something went wrong", status: false }
      })
    }
    if(response && !response.data) {
      return res.json({
        meta: { msg: "User not found", status: false }
      })
    }
    const user = response.data;
    const post = new postModel({ title, content, userId });
    await post.save();
    res.status(201).json({
      meta: { msg: "Data added successfully", status: true },
      data: post,
      user
    })
};

const postList = async (req, res) => {
  try {
    console.log(req.user)
    const { userId } = req.user;
    const posts = await postModel.find({ userId });
    if(!posts.length) {
      return res.json({
        meta: { msg: "Data not found", status: false }
      })
    }
    // Fetch user details for each post author
    const userServiceUrl = 'http://user-service:3000/users/getprofile?userId=';
    const response = await axios.get(`${userServiceUrl}${userId}`);
    if(!response || (response && !response.data)) {
      return res.json({
        meta: { msg: "Something went wrong", status: false }
      })
    }
    const user = response.data;
    res.json({
      meta: { msg: "Data found successfully", status: true },
      data: posts,
      user 
    });
  } catch (error) {
    console.log(error);
    return res.json({
      meta: { msg: e.message, status: false }
    })
  }
}

module.exports = {
    addPost,
    postList
};