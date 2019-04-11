const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

/**
 * Logs in a user
 */
exports.postLogin = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json({ msg: "All Field are required" });
	} else {
		User.findOne({
			where: { email }
		})
			.then(user => {
				if (!user) {
					return res.status(400).json({ msg: "Invalid Email" });
				}
				bcrypt
					.compare(password, user.password)
					.then(match => {
						if (!match) {
							res.status(400).json({ msg: "Invalid Password" });
						} else {
							// Creates a jwt and stores the userId in the encoded token
							jwt.sign(
								{ userId: user.id },
								process.env.AUTH_SECRET_KEY,
								{ expiresIn: "1h" },
								(err, token) => {
									if (!err) {
										res.json({
											token,
											user: {
												id: user.id,
												name: user.name,
												email: user.email
											}
										});
									} else {
										next(err);
									}
								}
							);
						}
					})
					.catch(err => {
						next(err);
					});
			})
			.catch(err => next(err));
	}
};

/**
 * Gets the current logged in user
 */
exports.getCurrentUser = (req, res, next) => {
	const userId = req.userId;
	User.findByPk(userId, {
		attributes: { exclude: ["password", "updatedAt"] }
	})
		.then(user => {
			res.json(user);
		})
		.catch(error =>
			res
				.status(500)
				.json({ msg: "Something went wrong while fetching the user", error })
		);
};
