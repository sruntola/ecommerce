const controller = require('../controllers/course_section.controller')
const { auth } = require('../middleware')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/v1/course_section', [auth.verifyToken], controller.createCourseSection)
    app.get('/api/v1/course_section', [auth.verifyToken], controller.findAllCourseSection)
}