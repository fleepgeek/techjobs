const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class Job extends Sequelize.Model {}
Job.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { sequelize })

module.exports = Job;