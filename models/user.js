const DataTypes = require('sequelize');
const database = require("../database");
const Task = require("./Task");


const User = database.define('Users', {

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User,{ foreignKey: 'user_id' });

module.exports = User;