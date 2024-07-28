const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {
    addPost,
    postList
} = require('../controllers/postController')

router.post('/add', addPost);
router.get('/list', auth, postList);

module.exports = router;
