const { auth } = require('../middleware')
const controller = require('../controllers/delivery-address.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/v1/delivery-address', [auth.verifyToken], controller.createDeliveryAddress)
    app.delete('/api/v1/delivery-address/:id', [auth.verifyToken], controller.deletedAddress)
    app.put('/api/v1/delivery-address/:id', [auth.verifyToken], controller.updateDeliveryAddress)
    app.get('/api/v1/delivery-address', [auth.verifyToken], controller.findAllDeliveryAddress)
}