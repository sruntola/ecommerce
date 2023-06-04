const controller = require('../controllers/slide.controller')
module.exports = async function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/v1/slide', controller.createSlide)
    app.get('/api/v1/slide', controller.findAllSlide)
    app.put('/api/v1/slide/:id', controller.updateSlide)
    app.delete('/app/v1/slide/:id', controller.deleteSlide)
}