
const { auth } = require("../middleware")
const controller = require("../controllers/product.controller")
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/v1/product', [auth.verifyToken], controller.createProduct);
    app.get('/api/v1/course', [auth.verifyToken], controller.findAllCourseByUser);
    app.get('/api/v1/product/:id', [auth.verifyisUserNotLoggend], controller.findProductDetail)
    app.get('/api/v1/products', [auth.verifyisUserNotLoggend], controller.findProductListing)
    app.put('/api/v1/product/:id', [auth.verifyToken], controller.updateProduct);
    app.delete('/api/v1/product/:id', [auth.verifyToken], controller.deleteProduct);
    app.post('/api/v1/course_view', [auth.verifyToken], controller.createCourseView)
    app.get('/api/v1/product-by-category-id/:id', [auth.verifyisUserNotLoggend], controller.findProductListingByCategory)
}