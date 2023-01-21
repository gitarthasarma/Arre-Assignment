const Sequelize = require('sequelize');
const db = require('../utils/database');

const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    phoneNum: {
        type: Sequelize.INTEGER,
    }
});

module.exports = User;
