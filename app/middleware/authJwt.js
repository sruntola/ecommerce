const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../model/index.model.js");
const User = db.users;

verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    let newToken = token.slice(7)
    console.log(token);
    console.log(newToken)
    jwt.verify(newToken, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

verifyisUserNotLoggend = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        next()
    } else {
        let newToken = token.slice(7)
        console.log(token);
        console.log(newToken)
        jwt.verify(newToken, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            req.userId = decoded.id;
            next();
        });
    }

};

const authJwt = {
    verifyToken: verifyToken,
    verifyisUserNotLoggend: verifyisUserNotLoggend
};

module.exports = authJwt