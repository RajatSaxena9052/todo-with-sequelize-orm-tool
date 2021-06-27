const DataTypes = require('sequelize');
const database = require("../database");
const Subtask = require("./subtask");

const Task = database.define('Tasks', {

    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

Task.hasMany(Subtask, { foreignKey: 'task_id' });
Subtask.belongsTo(Task, { foreignKey: 'task_id' });

module.exports = Task;