const Sequelize = require('sequelize');
const db = require('../utils/database');


const UserGroupMap = db.define('UserGroupMap', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    group_id: {
        type: Sequelize.INTEGER
    }
});

module.exports = UserGroupMap;