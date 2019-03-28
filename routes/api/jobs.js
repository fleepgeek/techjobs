/*
    Job Router
    All routes related to jobs are stored here.
    The main purpose of the router here is to call the 
    corresponding controller based on the path requested.
*/

const express = require("express");
const jobsController = require("../../controllers/jobs");
const router = express.Router();

// router.get("/:id", jobsController.getJobById);
router.get("/", jobsController.getJobs);
router.post("/", jobsController.postJob);
router.delete("/:id", jobsController.deleteJob);

module.exports = router;