const { Types } = require('mongoose')
const postModel = require('../models/post');
const axios = require('axios')
const { redisClient } = require('../middleware/redisClient')


const addPost = async (req, res) => {
    const { title, content } = req.body;
    const { userId } = req.user;
    if(!title || !content) {
      return res.json({
        meta: { msg: "Missing parameter", status: false }
      })
    }
    const findPost = await postModel.findOne({ title });
    if(findPost) {
      return res.json({
        meta: { msg: "Post already exists", status: false }
      })
    }
    const post = new postModel({ title, content, userId });
    await post.save();
    /* delete cached data */
    let key = `/posts/list:${userId}:*`;
    let keys = await redisClient.keys(key);
    if(keys.length) {
      await redisClient.del(keys)
    };
    /* delete cached data */
    res.status(201).json({
      meta: { msg: "Data added successfully", status: true },
      data: post,
      user: req.user
    })
};

const postList = async (req, res) => {
  try {
    const { page, resPerPage } = req.query;
    const { userId } = req.user;

    let key = `${req.originalUrl.split('?')[0]}:${userId}:${page}`;
    const data = await redisClient.get(key)
    if (data) {
        console.log('Data retrieved from cache', key);
        return res.json({
            meta: { msg: "Data found successfully", status: true },
            ...JSON.parse(data),
        });
    }

    const posts = await postModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(+resPerPage)
      .skip((+resPerPage * +page) - +resPerPage);
    if(!posts.length) {
      return res.json({
        meta: { msg: "Data not found", status: false }
      })
    }

    console.log(`Data not found in cache: ${key}`);
    await redisClient.set(key, JSON.stringify({
        data: posts
    }));
    //await redisClient.expire(key, '10') //in secs
    console.log(`Data saved in cache memory: ${key}`);

    res.json({
      meta: { msg: "Data found successfully", status: true },
      data: posts,
      user: req.user 
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