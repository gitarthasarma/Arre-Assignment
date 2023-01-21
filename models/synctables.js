const db = require('../utils/database');

const User = require('./User');
const Group = require('./Group');
const UserGroupMap = require('./UserGroupMap');
const Message = require('./Message');

const syncTables = async () => {
    try {
        User.hasMany(UserGroupMap, { foreignKey: 'user_id', sourceKey: 'id', onDelete: 'CASCADE'});
        UserGroupMap.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', onDelete: 'CASCADE'});
        Group.hasMany(UserGroupMap, { foreignKey: 'group_id', sourceKey: 'id', onDelete: 'CASCADE'});
        UserGroupMap.belongsTo(Group, { foreignKey: 'group_id', targetKey: 'id', onDelete: 'CASCADE'});
        UserGroupMap.hasMany(Message, { foreignKey: 'reference_id', sourceKey: 'id', onDelete: 'CASCADE'});
        Message.belongsTo(UserGroupMap, { foreignKey: 'reference_id', targetKey: 'id', onDelete: 'CASCADE'});
        await db.sync({});
    } catch (err) {
        console.log("error in sync table we got: ", err);
        throw err;
    }
}

module.exports = syncTables
