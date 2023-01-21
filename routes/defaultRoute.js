const express = require('express')
const User = require('../models/User')
const Group = require('../models/Group')
const Message = require('../models/Message')
const UserGroupMap = require('../models/UserGroupMap')

const router = express.Router();


const checkUserGroupMatchExists = async (user_id, group_id) => {
    // check if user and group exists
    const user = await User.findByPk(user_id);
    if (user === null) {
        return {
            value: false,
            msg: "User does not exist"
        }
    }
    const group = await Group.findByPk(group_id);
    if (group === null) {
        return {
            value: false,
            msg: "Group does not exist"
        }
    }
    const map = await UserGroupMap.findOne({
        where: {
            user_id: user_id,
            group_id: group_id
        }
    });
    if (map == null) {
        return {
            value: false,
            msg: "User does not exist"
        }
    }
    return {
        value: true,
        msg: 'successful',
        map: map
    }
}

const postProcessMessages = (messages) => {
    messages.forEach((elem, idx, arr) => {
        elem = {
            message: elem.message_content,
            time: elem.time_stamp
        }
        arr[idx] = elem;
    });
    return messages;
}


/////////////////////////////////////////////////////////////////////////////////////////////


router.get('/messages', async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const group_id = req.query.group_id;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;


        const preprocess = await checkUserGroupMatchExists(user_id, group_id);
        
        if (!preprocess.value) {
            return res.status(200).json({
                msg: preprocess.msg
            });
            
        }

        // find all messages sent by this user in this group
        const messages = await Message.findAll({
            where: {
                reference_id: preprocess.map.id
            },
            limit: limit,
            offset: (page - 1) * limit,
        });

        res.status(200).json({
            msg: "Messages grabbed successfully",
            messages: postProcessMessages(messages)
        });
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            'msg':'Internal Server Error'
        });
    }
});


router.get('/messages_group', async (req, res) => {
    try {
        const group_id = req.query.group_id;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const allMaps = await UserGroupMap.findAll({
            where: {
                group_id: group_id
            }
        });
        const finalMessages = [];

        for (const map of allMaps) {
            messages = await Message.findAll({
                where: {
                    reference_id: map.id
                },
                limit: limit,
                offset: (page - 1) * limit,
            });
            messages.forEach((msg) => {
                finalMessages.push({
                    user_id: map.user_id,
                    message_content: msg.message_content,
                    timestamp: msg.time_stamp
                });
            })
        }

        res.status(200).json({
            msg: "Messages grabbed successfully",
            messages: finalMessages
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server error"
        })
    }
    
})


router.post('/messages', async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const group_id = req.body.group_id;
        const msg_content = req.body.msg_content;
        const time_stamp = Date.now(); // take the server datetime
        
        const preprocess = await checkUserGroupMatchExists(user_id, group_id);

        if (!preprocess.value) {
            return res.status(200).json({
                msg: preprocess.msg
            });
        }

        const message = await Message.create({
            message_content: msg_content,
            reference_id: preprocess.map.id,
            time_stamp: time_stamp
        });

        res.status(200).json({
            msg: "Message Posted Successfully",
            msg_id: message.id
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server error"
        });
    }
    
});

module.exports = router