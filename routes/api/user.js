const express = require("express");
const { body } = require("express-validator/check");

const userController = require("../../controllers/user");
const upload = require("../../middlewares/upload");

const router = express.Router();

// Creates a new user and
// processes an image upload via upload.single("image_field_name") middleware
router.post(
	"/",
	[
		body("email")
			.isEmail()
			.withMessage("Invalid email format"),
		body("name")
			.trim()
			.isLength({ min: 4 })
			.withMessage("Name too short")
	],
	upload.single("image"),
	userController.postAddUser
);

module.exports = router;
