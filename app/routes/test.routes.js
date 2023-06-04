const controller = require('../controllers/lesson.controller')
const { auth } = require('../middleware')
const multer = require('multer')
const uploadImage = require('../utils/helpers')

module.exports = function (app) {
    const multerMid = multer({
        storage: multer.memoryStorage(),
        limits: {
            // no larger than 5mb.
            fileSize: 50 * 1024 * 1024,
        },
    })
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.use(multerMid.single('file'))
    app.post('/api/v1/testleng', [auth.verifyToken], (req, res) => {
        console.log(res)
    })
}