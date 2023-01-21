const express = require('express');
const User = require('../models/User');

const router = express.Router()

// create a user
router.post('/user', async (req, res) => {
    const name = req.body.name;
    const phoneNum = req.body.phone_num;
    const user = await User.create({
        name:name,
        phoneNum:phoneNum
    });
    res.status(200).json({
        user_id: user.id
    })
});

module.exports = router
