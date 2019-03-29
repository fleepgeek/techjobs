const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).json({ msg: "All Field are required" })
    }else {
        User.findOne({
            where: { email }
        }).then(user => {
            if(!user) {
                return res.status(400).json({ msg: "Invalid Email" })
            }
            bcrypt.compare(password, user.password)
                .then(match => {
                    if(!match) {
                        return res.status(400).json({ msg: "Invalid Password" })
                    }
                    jwt.sign(
                        { id: user.id }, 
                        process.env.AUTH_SECRET_KEY, 
                        (err, token) => {
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        });
                })
                .catch(err => {
                    next(err)
                })
        }).catch(err => next(err))
    }
}