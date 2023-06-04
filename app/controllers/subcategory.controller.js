const db = require('../model/index.model')
const SubCategory = db.subcategories
const Category = db.categories

exports.createSubCategory = async (req, res) => {
    const { name, categoryId } = req.body
    const category = Category.findByPk(req.body.categoryId);

    try {
        await SubCategory.create({
            name: name,
            categoryId: categoryId
        }).then(category => {
            res.status(201).send({
                message: "Subcategory was created."
            })
        })
    } catch (ex) {
        res.status(404).send({
            message: ex
        })
    }
}

exports.findAllSubCategoryEachCategories = async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
        res.status(403).send({
            message: "Category ID is invalid"
        })
    } else {
        await SubCategory.findAll({
            where: {
                categoryId: req.params.id
            },
            attributes: ['id', 'name']

        }).then(subcategories => {
            res.status(200).send(subcategories)
        })
    }
}

exports.deleteSubCategory = async (req, res) => {
    const subCategory = SubCategory.findByPk(req.params.id);
    if (!subCategory) {
        res.status(404).send({
            message: "ID is invalid..."
        })
    } else {
        await SubCategory.destroy({
            where: {
                id: req.params.id
            }
        }).then(sub => {
            res.status(200).send({
                message: "Subcategory was deleted..."
            })
        })
    }
}

exports.updateSubcategory = async (req, res) => {
    const subCategory = SubCategory.findByPk(req.params.id)
    if (!subCategory) {
        res.status(404).send({
            message: "ID is invalid"
        })
    } else {
        await SubCategory.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.id
            }
        }).then(sub => {
            res.status(200).send({
                message: "Subcategory was updated..."
            })
        })
    }
}