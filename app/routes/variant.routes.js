const controller = require("../controllers/variant.controller")
const { auth } = require("../middleware")
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    app.post("/api/v1/variant", [auth.verifyToken], controller.createVariant)
    app.put('/api/v1/variant/:id', [auth.verifyToken], controller.updateVariant)
    app.delete('/api/v1/variant/:id', [auth.verifyToken], controller.deleteVariant)
    app.get('/api/v1/variant', controller.findAllVariant)
}