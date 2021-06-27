const Task = require("../models/Task");
const Subtask = require("../models/subtask");
const { Op } = require("sequelize");



async function getSubtask(inputData) {
    try {
        if (inputData === undefined) {

            const allSubtask = await Subtask.findAll();

            if (allSubtask == null) {
                return null;
            } else {
                return allSubtask;
            }

        } else {
            const subtask_id = inputData;

            const subtaskById = await Subtask.findOne(
                {
                    where: {
                        subtask_id
                    }
                });

            if (subtaskById == null) {
                return null;
            }
            else {
                return subtaskById;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function addSubtask(inputData) {
    try {
        const { task_id, user_id, name, isCompleted } = inputData;

        const taskIdExist = await Task.findOne(
            {
                where:
                {
                    [Op.and]: {
                        user_id,
                        task_id
                    }
                }
            });

        if (taskIdExist == null) {
            return null;
        } else {
            const newSubtask = await Subtask.create(
                {
                    name,
                    isCompleted,
                    task_id
                }
            );

            return newSubtask;
        }
    }
    catch (errror) {
        console.log(error);
    }
}

async function deleteSubtask(inputData) {
    try {
        const { subtask_id, user } = inputData;

        const subtaskIdExist = await Subtask.findOne(
            {
                where: {
                    [Op.and]: {
                        subtask_id
                    }
                },
                include: [Task]
            });

        if (subtaskIdExist === null) {
            return undefined;
        }
        else {
            if (user != subtaskIdExist.Task.user_id) {
                return null;
            }
            else {
                const subtaskDeleted = await Subtask.destroy(
                    {
                        where: {
                            subtask_id,
                            task_id: subtaskIdExist.dataValues.Task.task_id
                        }
                    });

                return subtaskIdExist;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function editSubtask(inputData) {
    try {
        const { subtask_id, user, name, isCompleted } = inputData;

        const subtaskIdExist = await Subtask.findOne({
            where: {
                subtask_id,
            },
            include: [Task]
        });

        if (subtaskIdExist === null) {
            return undefined;
        }
        else {

            if (user != subtaskIdExist.Task.user_id) {
                return null;
            }
            else {
                const task_id = subtaskIdExist.dataValues.task_id;

                const subtaskUpdated = await Subtask.update(
                    {
                        name: name || subtaskIdExist.name,
                        isCompleted: isCompleted || subtaskIdExist.isCompleted
                    }, {
                    where: {
                        subtask_id,
                        task_id
                    }
                });

                return await Subtask.findOne(
                    {
                        where: {
                            subtask_id,
                        },
                        include: [Task]
                    });
            }

        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = { getSubtask, addSubtask, deleteSubtask, editSubtask };