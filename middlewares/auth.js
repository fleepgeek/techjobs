const jwt = require("jsonwebtoken");

/**
 * Simple middleware to authenticate a request based
 * on a token.
 * Pass this middleware to any route that requires authentication
 */
const authenticate = (req, res, next) => {
	// Gets the token from the request header
	const token = req.header("x-access-token");

	if (!token) {
		res.status(400).json({ msg: "Token Required" });
	} else {
		jwt.verify(token, process.env.AUTH_SECRET_KEY, function(err, decoded) {
			if (err) {
				return res.status(401).json({ msg: "Invalid Token", error: err });
			} else {
				// Store the userId in the global request object.
				// This means that any middleware can get the userId
				// via req.userId. Remember, this is only available if
				// the user is authenticated
				req.userId = decoded.userId;
				next(); // Success. Proceed to the next middleware
			}
		});
	}
};

module.exports = authenticate;
