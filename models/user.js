const Sequelize = require("sequelize");

const sequelize = require("../config/database");

class User extends Sequelize.Model {}
User.init(
	{
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		imageUrl: {
			type: Sequelize.STRING,
			allowNull: true
		}
	},
	{ sequelize }
);

module.exports = User;
