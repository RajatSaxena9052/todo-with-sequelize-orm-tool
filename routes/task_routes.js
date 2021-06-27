const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { addTask, getTask, updateTask, removeTask } = require("../query/task_queries");
const tokenVerifier = require("../tokenVerifier");

router.post("/:id", tokenVerifier, async (req, res) => {
    const data = req.body;

    const user_id = Number(req.params.id);

    try {
        const decoded = jwt.verify(req.token, "secretkey");

        if (user_id === NaN || Number.isInteger(user_id) === false) {
            res.status(400).json({
                "message": "Please enter the correct user id "
            });
        }

        if (decoded.user.user_id !== user_id) {

            res.status(403).json({
                "message": "Cannot add on other Users Task "
            });

        } else {
            const newTask = await addTask({ ...data, user_id });

            if (newTask === null) {

                res.status(409).json({
                    message: "Task Already exist"
                });

            } else {

                res.status(201).json({
                    message: "Task Created",
                    newTask
                });

            }
        }
    }
    catch (error) {
        console.log(error);
    }
});


router.patch("/", tokenVerifier, async (req, res) => {
    const data = req.body;

    const user_id = Number(req.query.user_id);
    const task_id = Number(req.query.task_id);


    try {
        const decoded = jwt.verify(req.token, "secretkey");

        if (user_id === NaN || Number.isInteger(user_id) === false || task_id === NaN || Number.isInteger(task_id) === false) {

            res.status(400).json({
                "message": "Please enter the correct user id or task_id "
            });

        } else {
            if (decoded.user.user_id !== user_id) {

                res.status(403).json({
                    "message": "Cannot Update another Users Task"
                });

            } else {
                const updatedTask = await updateTask({ ...data, user_id, task_id });

                if (updatedTask === null) {

                    res.status(404).json({
                        "message": "No Task Exist with the entered task id"
                    });

                } else {

                    res.status(201).json({
                        message: "Task Updated Successfully",
                        updatedTask
                    });

                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});


router.get("/", async (req, res) => {
    const allTask = await getTask(undefined);

    if (allTask === null) {

        res.status(404).json({
            "message": "No task Found"
        });

    } else {

        res.status(201).json({
            message: "All Task",
            allTask
        });

    }

});


router.get("/:id", async (req, res) => {
    try {
        const task_id = Number(req.params.id);

        if (task_id === NaN || Number.isInteger(task_id) === false) {

            res.status(400).json({
                "message": "Please enter the correct task id"
            });

        } else {
            const taskById = await getTask(task_id);

            if (taskById === null) {

                res.status(404).json({
                    "message": "No task Found"
                })

            } else {

                res.status(200).json({
                    message: "Task for taskid " + task_id,
                    taskById
                });

            }
        }
    } catch (error) {
        console.log(error);
    }

});

router.delete("/", tokenVerifier, async (req, res) => {
    try {
        const user_id = Number(req.query.user_id);
        const task_id = Number(req.query.task_id);

        const decoded = jwt.verify(req.token, "secretkey");

        if (user_id === NaN || Number.isInteger(user_id) === false || task_id === NaN || Number.isInteger(task_id) === false) {

            res.status(400).json({
                "message": "Please enter the correct task_id or user_id"
            });

        } else {
            if (decoded.data[0].user_id !== user_id) {

                res.status(403).json({
                    "message": "Cannot Delete another Users Task"
                });

            } else {
                const deletedTask = await removeTask({ user_id, task_id });

                if (deletedTask === null) {

                    res.status(404).json({
                        "message": "No Task Exist with the entered task id"
                    });

                } else {

                    res.status(204).json({
                        message: "Task Deleted Successfully",
                        deletedTask
                    });

                }
            }
        }
    } catch (error) {
        console.log(error);
    }
})



module.exports = router;