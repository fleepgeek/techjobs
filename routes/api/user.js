const express = require("express");
const userController = require("../../controllers/user");
const router = express.Router();

router.post("/", userController.postAddUser);

module.exports = router;