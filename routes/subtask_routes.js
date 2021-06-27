const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


const { addSubtask, getSubtask, deleteSubtask, editSubtask } = require("../query/subtask_queries");
const tokenVerifier = require("../tokenVerifier");


router.post("/:id", tokenVerifier, async (req, res) => {
    try {

        const inputData = req.body;
        const task_id = Number(req.params.id);
        const decoded = jwt.verify(req.token, 'secretkey');

        if (task_id === NaN || Number.isInteger(task_id) === false) {

            res.status(400).json({
                "message": "Please enter the correct task id"
            });

        }
        else {
            const newSubtask = await addSubtask({ ...inputData, task_id, user_id: decoded.user.user_id })

            if (newSubtask === null) {
                res.status(404).json({
                    "message": "Cannot Add subtask of another user"
                });
            } else {
                res.status(201).json({
                    message: "SubTask Created",
                    newSubtask
                });
            }
        }
    }
    catch (error) {
        console.error(error);
    }

});


router.delete("/:id", tokenVerifier, async (req, res) => {
    try {
        const decoded = jwt.verify(req.token, 'secretkey');
        const subtask_id = Number(req.params.id);

        if (subtask_id === NaN || Number.isInteger(subtask_id) === false) {
            res.status(400).json({
                "message": "Please enter the correct Subtask id "
            });
        }

        const deletedtask = await deleteSubtask({ subtask_id: req.params.id, user: decoded.user.user_id });
        if (deletedtask === null) {

            res.status(404).json({
                "message": "Cannot delete subtask of another user"
            });

        }
        else if (deletedtask === undefined) {

            res.status(404).json({
                "message": "No subtask found "
            });

        }
        else {

            res.status(200).json({
                message: "Task Deleted Successfully",
                deletedtask
            });

        }
    } catch (error) {
        console.log(error);
    }
});



router.patch("/:id", tokenVerifier, async (req, res) => {
    try {
        const decoded = jwt.verify(req.token, 'secretkey');
        const subtask_id = Number(req.params.id);

        if (subtask_id === NaN || Number.isInteger(subtask_id) === false) {
            res.status(400).json({
                "message": "Please enter the correct Subtask id "
            });
        }
        
        const updatedSubtask = await editSubtask({ subtask_id: req.params.id, user: decoded.user.user_id, ...req.body });

        if (updatedSubtask === null) {

            res.status(404).json({
                "message": "Cannot Update subtask of another user"
            });

        }
        else if (updatedSubtask === undefined) {

            res.status(404).json({
                "message": "No subtask found "
            });

        }
        else {

            res.status(200).json({
                message: "Task Updated Successfully",
                updatedSubtask
            });

        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const allSubtask = await getSubtask(undefined);

        if (allSubtask === null) {
            res.status(404).json({
                "message": "No Subtask Found"
            });
        }
        else {
            res.status(201).json({
                message: "All SubTask",
                allSubtask
            });
        }

    } catch (error) {
        console.log(error);
    }
})


router.get("/:id", async (req, res) => {
    try {
        const subtask_id = Number(req.params.id);

        if (subtask_id === NaN || Number.isInteger(subtask_id) === false) {

            res.status(400).json({
                "message": "Please enter the correct subtask id"
            });

        } else {
            const subtaskById = await getSubtask(subtask_id);

            if (subtaskById === null) {

                res.status(404).json({
                    "message": "No Subtask Found for particular subtask_id"
                })

            } else {

                res.status(200).json({
                    message: `Subtask for subtaskid : ${subtask_id} is`,
                    subtaskById
                });

            }
        }
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;