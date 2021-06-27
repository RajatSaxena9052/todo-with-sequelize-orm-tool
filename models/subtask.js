const dataTypes = require('sequelize');
const database = require("../database");

const subTask = database.define('Subtasks', {

    subtask_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: dataTypes.STRING,
        allowNull: false
    },
    isCompleted: {
        type: dataTypes.BOOLEAN,
        defaultValue: false
    },
    task_id: {
        type: dataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = subTask;