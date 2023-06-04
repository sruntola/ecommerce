const controller = require('../controllers/favorite.controller')
const { auth } = require('../middleware')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/v1/favorite', [auth.verifyToken], controller.addProductToFavorite);
    app.delete('/api/v1/favorite/:id', [auth.verifyToken], controller.removeFromFavorite);
}