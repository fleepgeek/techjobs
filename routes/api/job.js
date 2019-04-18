/*
    Job Router
    All routes related to jobs are stored here.
    The main purpose of the router here is to call the 
    corresponding controller based on the path requested.
*/

const express = require("express");
const { body } = require("express-validator/check");
const jobController = require("../../controllers/job");
const authenticate = require("../../middlewares/auth");

const router = express.Router();

router.get("/:id", jobController.getJobById);
router.get("/", jobController.getJobs);
router.post(
	"/",
	[
		body("title")
			.trim()
			.isLength({ min: 4 })
			.withMessage("Job Title must be more that 4 characters long")
	],
	authenticate,
	jobController.postJob
);
router.delete("/:id", authenticate, jobController.deleteJob);
router.get("/user/:id", jobController.getJobsByUser);

module.exports = router;
