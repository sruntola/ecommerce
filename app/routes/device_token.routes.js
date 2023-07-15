const { auth } = require('../middleware')
const controller = require('../controllers/device_token.controller')
const notification = require('../controllers/notification.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/v1/device_token', [auth.verifyToken], controller.storeDeviceToken)
    app.post('/api/v1/notification', [auth.verifyToken], notification.sendNotification)
}