const { auth } = require("../middleware");
const controller = require("../controllers/order-status.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/v1/order-status",
    [auth.verifyTokenAndAdmin],
    controller.findAllOrderStatus
  );
  app.put(
    "/api/v1/order-status/:id",
    [auth.verifyTokenAndAdmin],
    controller.updateOrderStatus
  );
  app.post(
    "/api/v1/order-status",
    [auth.verifyTokenAndAdmin],
    controller.createOrderStatus
  );
  app.delete(
    "/api/v1/order-status/:id",
    [auth.verifyTokenAndAdmin],
    controller.deleteOrderStatus
  );
};
