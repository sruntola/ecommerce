const { auth } = require("../middleware");
const controller = require("../controllers/variants.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/v1/variant", controller.addVariant);
  app.delete("/api/v1/variant/:id", controller.deleteVariant);
  app.put("/api/v1/variant/:id", controller.updateVariant);
};
