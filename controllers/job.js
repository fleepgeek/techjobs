const Job = require("../models/job");
const User = require("../models/user");

/**
 * Gets all Jobs
 */
exports.getJobs = (req, res, next) => {
	Job.findAll()
		.then(jobs => {
			res.json(jobs);
		})
		.catch(err => res.json({ success: false }));
};

/**
 * Gets a Single Job by its id
 */
exports.getJobById = (req, res) => {
	const jobId = req.params.id;
	Job.findByPk(jobId)
		.then(job => {
			if (!job) {
				res.status(404).json({ success: false, message: "Job not Found" });
			} else {
				res.json(job);
				// User.findByPk(job.userId, {
				// 	attributes: { exclude: ["password", "createdAt", "updatedAt"] }
				// })
				// 	.then(user => {
				// 		const data = {
				// 			title: job.title,
				// 			user: {
				// 				name: user.name
				// 			}
				// 		};
				// 		res.json(data);
				// 	})
				// 	.catch(
				// 		res.status(500).json({
				// 			success: false,
				// 			message: "Something went wrong while getting the user"
				// 		})
				// 	);
			}
		})
		.catch(err =>
			res.status(500).json({
				success: false,
				message: "Something went wrong while getting the job"
			})
		);
};

/**
 * Posts a Job
 */
exports.postJob = (req, res) => {
	const { title } = req.body;
	const userId = req.userId;
	console.log("Req userId:" + userId);
	console.log("Header" + req.header("x-access-token"));

	Job.create({
		title,
		userId
	})
		.then(job => {
			res.json(job);
		})
		.catch(err => res.json({ message: "Job creation Failed", error: err }));
};

/**
 * Deletes a Job
 */
exports.deleteJob = (req, res) => {
	const jobId = req.params.id;
	Job.findByPk(jobId)
		.then(job => {
			if (job.userId !== req.userId) {
				res
					.status(401)
					.json({ msg: "You can't delete a job you did not create" });
			} else {
				job
					.destroy()
					.then(() => {
						res.json({ success: true });
					})
					.catch(err => res.json({ success: false }));
			}
		})
		.catch(err =>
			res.json({ success: false, message: "This Job doesnt exists" })
		);
};
