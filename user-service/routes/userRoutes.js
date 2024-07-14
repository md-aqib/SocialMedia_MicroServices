const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {
 registerUser
} = require('../controllers/postController')

router.post('/register', registerUser);

module.exports = router;
