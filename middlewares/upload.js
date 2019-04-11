const multer = require("multer");

// Setup for the multer middleware
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	}
});

// Returns true if the file you're trying to upload
// passes the conditions else the upload fails by
// returning false
function fileFilter(req, file, cb) {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

// Creates a new multer instance
const upload = multer({ storage, fileFilter });

module.exports = upload;
