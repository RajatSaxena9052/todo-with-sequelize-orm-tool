const { Op } = require("sequelize")

const User = require("../models/user");


async function login(inputdata) {
    const { username, password } = inputdata;
    try {

        const userExist = await User.findOne(
            {
                where: {
                    [Op.and]: {
                        username: username,
                        password: password
                    }
                },
            });

        if (userExist === null) {
            return null;
        } else {
            return userExist;
        }

    } catch (error) {
        console.log(error)
    }
}

async function addUser(inputData) {
    try {
        const { username, password } = inputData;

        const userExist = await User.findOne(
            {
                where: {
                    [Op.or]: {
                        username: username,
                        password: password
                    }
                }
            }
        );

        if (userExist === null) {
            const newUser = await User.create(
                {
                    username: username,
                    password: password
                }
            );

            return newUser;
        } else {
            return null;
        }

    } catch (error) {
        console.log(error);
    }

}

async function getUser() {

    try {
        const userExist = await User.findAll();
        console.log(userExist);

        if (userExist === null) {
            return null;
        } else {
            return userExist;
        }

    } catch (error) {
        console.log(error);
    }

}

async function getUserById(inputData) {
    try {
        const { user_id } = inputData;
        const userExist = await User.findOne(
            {
                where: {
                    user_id: user_id
                }
            });

        if (userExist === null) {
            return null;
        } else {
            return userExist;
        }

    } catch (error) {
        console.log(error);
    }
}

async function editUserById(inputData) {
    try {
        const { user_id, username, password } = inputData;

        const userExist = await User.findOne(
            {
                where: {
                    user_id: user_id
                }
            });

        if (userExist === null) {
            return null;

        } else {

            if (password === undefined) {
                const userUpdate = await User.update(
                    { username: username },
                    {
                        where: {
                            user_id: user_id
                        }
                    });

                return userExist;
            } else {
                const userUpdate = await User.update(
                    { username: username, password: password },
                    {
                        where: {
                            user_id: user_id
                        }
                    }
                );

                return userExist;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { addUser, getUser, getUserById, login, editUserById };
