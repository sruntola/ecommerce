const controller = require('../controllers/profile.controller')
const { auth } = require('../middleware')
const multer = require('multer')
const uploadImage = require('../utils/helpers')

// module.exports = function (app) {
//     app.use(function (req, res, next) {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "x-access-token, Origin, Content-Type, Accept"
//         );
//         next();
//     });
//     const multerMid = multer({
//         storage: multer.memoryStorage(),
//         limits: {
//             // no larger than 5mb.
//             fileSize: 50 * 1024 * 1024,
//         },
//     })
//     app.use(multerMid.single('file'))
//     // app.post('/api/v1/profile', [auth.verifyToken], controller.createProfile)
//     app.post('/api/v1/profile', [auth.verifyToken], (req, res) => {
//         console.log(req)
//     })

// }

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
    // app.post('/api/v1/profile', [auth.verifyToken], multerMid.single('imageprofile'), (req, res) => {
    //     console.log('hwllo')
    // })
    app.post('/api/v1/profile', [auth.verifyToken], multerMid.single('imageprofile'), controller.createProfile)
}