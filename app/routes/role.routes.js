const { auth } = require("../middleware");
const controller = require("../controllers/role.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/v1/role", [auth.verifyTokenAndAdmin], controller.createRole);
  app.get("/api/v1/role", [auth.verifyTokenAndAdmin], controller.findAllRole);
  app.delete(
    "/api/v1/role/:id",
    [auth.verifyTokenAndAdmin],
    controller.deleteRole
  );
  app.put(
    "/api/v1/role/:id",
    [auth.verifyTokenAndAdmin],
    controller.updateRole
  );
};
