const { auth } = require("../middleware");
const multer = require("multer");
const controller = require("../controllers/product.controller");
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
    "/api/v1/product",
    [auth.verifyToken],
    multerMid.single("thumbnail"),
    controller.createProduct
  );
  app.get("/api/v1/course", [auth.verifyToken], controller.findAllCourseByUser);
  app.get(
    "/api/v1/product/:id",
    [auth.verifyisUserNotLoggend],
    controller.findProductDetail
  );
  app.get(
    "/api/v1/products",
    [auth.verifyisUserNotLoggend],
    controller.findProductListing
  );
  app.put(
    "/api/v1/product/:id",
    [auth.verifyToken],
    multerMid.single("thumbnail"),
    controller.updateProduct
  );
  app.delete(
    "/api/v1/product/:id",
    [auth.verifyToken],
    controller.deleteProduct
  );
  app.post(
    "/api/v1/course_view",
    [auth.verifyToken],
    controller.createCourseView
  );
  app.get(
    "/api/v1/product-by-category-id/:id",
    [auth.verifyisUserNotLoggend],
    controller.findProductListingByCategory
  );
};
