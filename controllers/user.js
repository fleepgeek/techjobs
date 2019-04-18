const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");

const User = require("../models/user");

/**
 * Creates a new User
 */
exports.postAddUser = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	const { name, email, password } = req.body;
	let imageUrl = null;
	// req.file is availble because of multer.
	// remember req.body was available because of bodyParser
	// multer gives you access to files and data submitted from forms with
	// enctype="multipart/form-data"
	if (req.file) {
		imageUrl = req.file.path;
	}
	if (!name || !email || !password) {
		res.status(400).json({ msg: "All Field are required" });
	} else {
		let hashedPassword;
		// Checks to see if the user already exists via the email field
		User.findOne({
			where: { email }
		})
			.then(user => {
				if (user) {
					const error = new Error("User already exists");
					error.statusCode = 400;
					next(err);
				} else {
					try {
						const salt = bcrypt.genSaltSync(10);
						hashedPassword = bcrypt.hashSync(password, salt);
					} catch (error) {
						throw error;
					}
					User.create({
						name,
						email,
						password: hashedPassword,
						imageUrl
					})
						.then(user => {
							jwt.sign(
								{ userId: user.id },
								process.env.AUTH_SECRET_KEY,
								{ expiresIn: "1h" },
								(err, token) => {
									res.json({
										token,
										user: {
											id: user.id,
											name: user.name,
											email: user.email
										}
									});
								}
							);
						})
						.catch(err => next(err));
				}
			})
			.catch(err => next(err));
	}
};
