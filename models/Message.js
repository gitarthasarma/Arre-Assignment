const Sequelize = require('sequelize');
const db = require('../utils/database');


const Message = db.define('Message', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message_content: {
        type: Sequelize.STRING,
    },

    time_stamp: {
        type: Sequelize.DATE,
    },

    reference_id: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Message;