const express = require("express");
const authController = require("../../controllers/auth");
const authenticate = require("../../middlewares/auth");

const router = express.Router();

router.post("/", authController.postLogin);
router.get("/user", authenticate, authController.getCurrentUser);

module.exports = router;
