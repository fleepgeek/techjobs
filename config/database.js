const Sequelize = require("sequelize");

const sequelize = new Sequelize("express_jobs", "root", process.env.MYSQL_PASSWORD, {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;