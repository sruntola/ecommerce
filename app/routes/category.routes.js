const db = require("../model/index.model");
const Category = db.categories;
const controller = require("../controllers/category.controller");
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
    "/api/v1/category",
    multerMid.single("icon"),
    controller.createCategory
  );
  app.get("/api/v1/category", controller.findAllCategories);
  app.get("/api/v1/category/:id", controller.findByID);
  app.delete("/api/v1/category/:id", controller.deleteCategory);
  app.put(
    "/api/v1/category/:id",
    multerMid.single("icon"),
    controller.updateCategory
  );
};
