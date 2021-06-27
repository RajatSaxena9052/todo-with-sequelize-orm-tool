const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const { addUser, getUser, getUserById, login, editUserById } = require("../query/user_queries");
const tokenVerifier = require("../tokenVerifier");


router.post("/login", async (req, res) => {
    const data = req.body;
    try {
        const user = await login(data);

        if (user === null) {
            res.status(403).json({
                message: "User doesnt exist"
            })
        } else {

            let token = jwt.sign({ user }, "secretkey");

            res.status(200).json({
                message: "User logged in and JWT created",
                token,
                user
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/signup", async (req, res) => {
    const inputData = req.body;

    try {
        const data = await addUser(inputData);

        if (data === null) {

            res.status(400).json({
                msg: "user or password already Exist",

            })

        } else {

            res.status(201).json({
                msg: "user added successfully",
                data: data
            });

        }
    } catch (error) {
        console.log(error);
    }

});

router.get("/", async (req, res) => {
    try {
        const data = await getUser();

        if (data === null) {

            res.status(400).json({
                msg: "No User Exist",
            })

        } else {

            res.status(200).json(
                {
                    msg: "All users",
                    data
                }
            );

        }
    } catch (error) {
        console.log(error);
    }

});

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (id === NaN || Number.isInteger(id) === false) {
            res.status(400).json({
                "message": "Please enter the correct User id "
            });
        } else {

            const data = await getUserById(id);

            if (data === null) {

                res.status(400).json({
                    msg: "No User Exist By this ID",
                })

            } else {

                res.status(200).json(
                    {
                        msg: "User Found",
                        data
                    }
                );

            }
        }
    } catch (error) {
        console.log(error);
    }

});

router.put("/:id", tokenVerifier, async (req, res) => {
    try {

        const user_id = req.params.id

        const data = await editUserById({ ...req.body, user_id });

        const decoded = jwt.verify(req.token, 'secretkey')

        if (decoded.user.user_id !== Number(user_id)) {

            res.status(403).json({
                "message": "Cannot Update another User"
            });

        } else {

            if (data === null) {

                res.status(400).json({
                    msg: "No User Exist By this ID",
                })

            } else {

                res.status(200).json(
                    {
                        msg: "User Updated",
                        data
                    }
                );

            }
        }
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;