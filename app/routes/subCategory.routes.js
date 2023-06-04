const controller = require('../controllers/subcategory.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/v1/sub-category', controller.createSubCategory)
    app.get('/api/v1/sub-category/:id', controller.findAllSubCategoryEachCategories)
    app.put('/api/v1/sub-category/:id', controller.updateSubcategory)
    app.delete('/api/v1/sub-category/:id', controller.deleteSubCategory)
}