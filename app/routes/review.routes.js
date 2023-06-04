const { auth } = require("../middleware")
const controller = require("../controllers/review.controller")

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/v1/review', [auth.verifyToken], controller.addReview)
    app.get('/api/v1/review', [auth.verifyToken], controller.findAllReview)
    app.get('/api/v1/review', [auth.verifyToken], controller.findAllReviewByCourse)
    app.put('/app/v1/review', [auth.verifyToken], controller.updateReview)
    app.delete('/app/v1/review/:id', [auth.verifyToken], controller.deleteReview)
}