const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {
 registerUser,
 login
} = require('../controllers/postController')

router.post('/register', registerUser);
router.post('/login', login);

module.exports = router;
