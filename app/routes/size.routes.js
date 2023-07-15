const controller = require("../controllers/sizes.controller");
const { auth } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/v1/size", [auth.verifyToken], controller.addProductSize);
  app.delete("/api/v1/size/:id", [auth.verifyToken], controller.deleteSize);
};
