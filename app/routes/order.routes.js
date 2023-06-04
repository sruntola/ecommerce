const { auth } = require('../middleware')
const controller = require('../controllers/order.controller')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/v1/order', [auth.verifyToken], controller.createOrder)
    app.get('/api/v1/order', [auth.verifyToken], controller.findAllOrder)
    app.put('/api/v1/order/:id', [auth.verifyToken], controller.updateOrder)
    app.delete('/api/v1/order/:id', [auth.verifyToken], controller.deleteOrder)
}