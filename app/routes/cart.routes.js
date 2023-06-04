const { auth } = require('../middleware')
const controller = require('../controllers/cart.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/v1/cart', [auth.verifyToken], controller.createAddToCart)
    app.delete('/api/v1/cart/:id', [auth.verifyToken], controller.removeProductFromCart)
    app.put('/api/v1/cart/:id', [auth.verifyToken], controller.updateCart)
    app.get('/api/v1/cart', [auth.verifyToken], controller.findAllCartListing)
}