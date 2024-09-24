const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userData = require('../middleware/userData')
const {
    addPost,
    postList
} = require('../controllers/postController')

router.post('/add', auth, userData, addPost);
router.get('/list', auth, userData, postList);

module.exports = router;
