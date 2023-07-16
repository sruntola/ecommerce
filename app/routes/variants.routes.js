const { auth } = require("../middleware");
const controller = require("../controllers/variants.controller");
const multer = require("multer");

module.exports = function (app) {
  const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      // no larger than 5mb.
      fileSize: 50 * 1024 * 1024,
    },
  });
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/v1/variant",
    multerMid.single("product_image"),
    controller.addVariant
  );
  app.delete("/api/v1/variant/:id", controller.deleteVariant);
  app.put(
    "/api/v1/variant/:id",
    multerMid.single("product_image"),
    controller.updateVariant
  );
};
