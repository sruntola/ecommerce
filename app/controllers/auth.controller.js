const db = require("../model/index.model")
const auth = require("../config/auth.config")
const User = db.users

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    if (!req.body.first_name) {
        res.status(403).send({
            message: "First name is required"
        })
    }
    if (!req.body.last_name) {
        res.status(403).send({
            message: "Last name is required"
        })
    }
    if (!req.body.email) {
        res.status(403).send({
            message: "Email is required"
        })
    }
    if (!req.body.password) {
        res.status(403).send({
            message: "password is required"
        })
    }
    User.create({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phoneNumber: req.body.phone_number,
        bio: req.body.bio,
        skills: req.body.skills
    })
        .then(userSignUp => {
            User.findOne({
                where: {
                    email: userSignUp.email
                }
            })
                .then(userSignIn => {
                    if (!userSignIn) {
                        return res.status(404).send({ message: "User Not found." });
                    }

                    var passwordIsValid = bcrypt.compareSync(
                        req.body.password,
                        userSignIn.password
                    );

                    if (!passwordIsValid) {
                        return res.status(401).send({
                            accessToken: null,
                            message: "Invalid Password!"
                        });
                    }
                    var token = jwt.sign({ id: userSignIn.id }, auth.secret, {
                        expiresIn: 864000000 // 24 hours
                    });
                    res.status(200).send({
                        id: userSignIn.id,
                        firstName: userSignIn.first_name,
                        lastName: userSignIn.last_name,
                        email: userSignIn.email,
                        accessToken: token
                    });

                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(403).send({
            message: "Please enter your email and password"
        })
    } else {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }
                var token = jwt.sign({ id: user.id }, auth.secret, {
                    expiresIn: 8640000 // 24 hours
                });
                res.status(200).send({
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    accessToken: token
                });

            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
};