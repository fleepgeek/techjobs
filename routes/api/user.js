const express = require("express");

const userController = require("../../controllers/user");
const upload = require("../../middlewares/upload");
const router = express.Router();

router.post("/", upload.single("image"), userController.postAddUser);

module.exports = router;
