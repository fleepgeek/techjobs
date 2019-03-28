const Sequelize = require("sequelize");

//Creates a Sequelize instance and sets the database config
const sequelize = new Sequelize("express_jobs", "root", process.env.MYSQL_PASSWORD, {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;