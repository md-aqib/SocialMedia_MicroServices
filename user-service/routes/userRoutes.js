const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
 registerUser,
 login,
 getProfile
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', login);
router.get('/getprofile', getProfile);

module.exports = router;
