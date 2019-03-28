const Job = require("../models/job");

/**
 * Gets all Jobs
 */
exports.getJobs = (req, res, next) => {
    Job.findAll()
        .then(jobs => {
            res.json(jobs);
        })
        .catch(err => res.json({ success: false }))
}

// exports.getJobById = (req, res) => {
//     const jobId = req.params.id;
//     Job.findByPk(jobId)
//         .then(job => {
//             console.log(job)
//             res.json(job)
//             if(job === null) {
//                 return res.status(404).json({ message: "Job not Found" })
//             }
//         })
//         .catch(err => res.json({ success: false, message: "Job does not exists" }))
// }

/**
 * Posts a Job
 */
exports.postJob = (req, res) => {
    const { title } = req.body;
    Job.create({
        title
    }).then(job => {
        res.json(job)
    })
    .catch(err => res.json({ message: "Failed", error: err }))
}

/**
 * Deletes a Job
 */
exports.deleteJob = (req, res) => {
    const jobId = req.params.id;
    Job.findByPk(jobId)
        .then(job => {
            job.destroy()
                .then(() => {
                    res.json({success: true})
                })
                .catch(err => res.json({success: false}))
        })
        .catch(err => res.json({success: false, message: "This Job doesnt exists"}))
}