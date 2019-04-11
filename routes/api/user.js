const express = require("express");

const userController = require("../../controllers/user");
const upload = require("../../middlewares/upload");

const router = express.Router();

// Creates a new user and
// processes an image upload via upload.single("image_field_name") middleware
router.post("/", upload.single("image"), userController.postAddUser);

module.exports = router;
