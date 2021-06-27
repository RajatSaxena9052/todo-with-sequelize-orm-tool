const Sequelize = require("sequelize");

const sequelize = new Sequelize('todo2', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;

/*
try {
    Promise.all([sequelize.authenticate()]).then(console.log)
    console.log('Connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}*/