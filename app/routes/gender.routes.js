const { auth } = require("../middleware");
const controller = require("../controllers/options.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/v1/gender", [auth.verifyToken], controller.createGender);
  app.delete("/api/v1/gender/:id", [auth.verifyToken], controller.deleteGender);
  app.put("/api/v1/gender/:id", [auth.verifyToken], controller.updateGender);
  app.get("/api/v1/gender", [auth.verifyToken], controller.findAllGender);
};
