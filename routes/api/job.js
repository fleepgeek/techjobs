/*
    Job Router
    All routes related to jobs are stored here.
    The main purpose of the router here is to call the 
    corresponding controller based on the path requested.
*/

const express = require("express");
const jobController = require("../../controllers/job");
const router = express.Router();

// router.get("/:id", jobsController.getJobById);
router.get("/", jobController.getJobs);
router.post("/", jobController.postJob);
router.delete("/:id", jobController.deleteJob);

module.exports = router;