const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../model/index.model.js");
const User = db.users;
const { Op } = require("sequelize");

verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  let newToken = token.slice(7);
  console.log(token);
  console.log(newToken);
  jwt.verify(newToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

verifyTokenAndAdmin = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  let newToken = token.slice(7);
  console.log(token);
  console.log(newToken);
  jwt.verify(newToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    User.findOne({
      where: {
        id: req.userId,
      },
      attributes: [
        "id",
        "first_name",
        "last_name",
        [
          db.sequelize.literal(
            `(SELECT roles.name from users inner join roles on users.role_id = roles.id where users.id=${req.userId})`
          ),
          "role",
        ],
      ],
    }).then((user) => {
      if (user.dataValues["role"] === "ADMIN") {
        next();
      } else {
        res
          .status(400)
          .send({ message: "You are not allowed, only ADMIN can access" });
      }
    });
  });
};

verifyisUserNotLoggend = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    next();
  } else {
    let newToken = token.slice(7);
    console.log(token);
    console.log(newToken);
    jwt.verify(newToken, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
  }
};

const authJwt = {
  verifyToken: verifyToken,
  verifyisUserNotLoggend: verifyisUserNotLoggend,
  verifyTokenAndAdmin: verifyTokenAndAdmin,
};

module.exports = authJwt;
