const Sequelize = require('sequelize');
const db = require('../utils/database');

const group = db.define('Group', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    }
});

module.exports = group;