const Task = require("../models/Task");
const { Op } = require("sequelize");

async function addTask(inputData) {
    const { name, description, isCompleted, user_id } = inputData;
    try {
        const taskExist = await Task.findOne(
            {
                where: {
                    [Op.or]: {
                        name: name,
                        description: description,
                        isCompleted: isCompleted,
                        user_id: user_id
                    }
                }
            });

        if (taskExist === null) {

            if (isCompleted === undefined) {
                const newTask = await Task.create(
                    {
                        name: name,
                        description: description,
                        isCompleted: isCompleted,
                        user_id: user_id
                    });

                return newTask;

            } else {
                const newTask = await Task.create(
                    {
                        name: name,
                        description: description,
                        isCompleted: isCompleted,
                        user_id: user_id
                    });

                return newTask;
            }

        }
        else {
            return null;
        }

    } catch (error) {
        console.log(error);
    }
}

async function getTask(inputData) {

    try {
        if (inputData === undefined) {

            const allTask = await Task.findAll();

            if (allTask == null) {
                return null;
            } else {
                return allTask;
            }

        } else {
            const task_id = inputData;

            const allTask = await Task.findOne(
                {
                    where: {
                        task_id
                    }
                });

            if (allTask == null) {
                return null;
            } else {
                return allTask;
            }
        }
    } catch (error) {
        console.log(error);
    }

}

async function updateTask(inputData) {

    try {
        const { name, description, isCompleted, user_id, task_id } = inputData;

        const taskExist = await Task.findOne(
            {
                where: {
                    [Op.and]: {
                        task_id,
                        user_id
                    }
                }
            });

        if (taskExist === null) {
            return null;
        }
        else {

            const updatedTask = await Task.update(
                {
                    name: name || taskExist.name,
                    description: description || taskExist.description,
                    isCompleted: isCompleted || taskExist.isCompleted
                }, {
                where: {
                    [Op.and]: {
                        task_id: task_id,
                        user_id: user_id
                    }
                }
            });

            return await Task.findOne({
                where: {
                    [Op.and]: {
                        task_id,
                        user_id
                    }
                }
            });

        }
    } catch (error) {
        console.log(error);
    }
}


async function removeTask(inputData) {
    try {
        const { user_id, task_id } = inputData;

        const taskExist = await Task.findOne(
            {
                where: {
                    [Op.and]: {
                        task_id,
                        user_id
                    }
                }
            });

        if (taskExist === null) {
            return null;
        } else {
            const removeTask = await Task.destroy(
                {
                    where: {
                        user_id,
                        task_id
                    }
                }
            );

            return taskExist;
        }
    } catch (error) {
        console.log(error);
    }

}


module.exports = { addTask, updateTask, getTask, removeTask };