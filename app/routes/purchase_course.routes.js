const controller = require('../controllers/purchase.controller')
const { auth } = require('../middleware')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/v1/purchase_course', [auth.verifyToken], controller.createPurchaseCourse)
}