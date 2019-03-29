const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.header("x-access-token");

    if(!token) {
        return res.status(400).json({ msg: "Token Required" })
    }

    jwt.verify(token, process.env.AUTH_SECRET_KEY, function(err, decoded) {
        if(err) {
            return res.status(401).json({ msg: "Invalid Token" })
        }
        req.user = decoded;
        next();
    });
}

module.exports = authenticate;