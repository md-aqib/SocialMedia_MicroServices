const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).send(user);
});

router.get('/list', async (req, res) => {
    const users = await User.find();
    if(!users.length) {
        return res.json({msg: "Data not found"})
    }
    res.status(200).send(users);
});

module.exports = router;
