const express = require('express');
const Group = require('../models/Group');
const UserGroupMap = require('../models/UserGroupMap');
const router = express.Router()

// create a group
router.post('/group', async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const group = await Group.create({
            name:name,
            description:description
        });
        res.status(200).json({
            group_id: group.id
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "internal server error"
        });
    }
    
});

// add a user to a group
router.post('/group_add_user', async (req, res) => {
    try {
        const group_id = req.body.group_id;
        const user_id = req.body.user_id;

        const map = await UserGroupMap.create({
            user_id: user_id,
            group_id: group_id
        });

        res.status(200).json({
            msg: "User successfully added to group"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
    

})
module.exports = router
