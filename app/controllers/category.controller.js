const db = require('../model/index.model')
const Category = db.categories

exports.createCategory = async (req, res) => {
    const { name, icon } = req.body;
    if (!name) {
        res.status(404).send({
            message: "Name is required"
        })
    }
    if (!icon) {
        res.status(404).send({
            message: "Icon is required"
        })
    }
    await Category.create({ name: name, icon: icon })
        .then(category => {
            res.status(201).send({
                success: true,
                message: "Category was created"
            })
        },)
}

exports.findAllCategories = async (req, res) => {
    const categories = await Category.findAll({
        attributes: ['id', 'name', 'icon']
    });
    if (!categories) {
        res.status(403).send({
            message: "Bad requestd"
        })
    } else {
        res.status(200).send(categories)
    }
}

exports.findByID = async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
        res.status(403).send({
            message: "Category Not found"
        })
    } else {
        res.status(200).send(category)
    }
}

exports.deleteCategory = async (req, res) => {
    const id = req.params.id

    if (!id) {
        res.status(403).send({
            message: "Category ID is required"
        })
    } else {
        const category = await Category.findByPk(req.params.id)
        if (!category) {
            res.status(404).send({
                message: "Category not found"
            })
        } else {
            await Category.destroy({
                where: {
                    id: id
                }
            }).then(category => {
                res.status(200).send({
                    message: "Category was deleted"
                })
            })
        }
    }
}

exports.updateCategory = async (req, res) => {
    const { name, icon } = req.body
    const category = await Category.findByPk(req.params.id);
    if (!category) {
        res.status(404).send({
            message: "Category not found"
        })
    } else {
        await Category.update({
            name: name,
            icon: icon
        }, {
            where: {
                id: req.params.id
            }
        }).then(category => {
            res.status(200).send({
                message: "Category was updated"
            })
        })
    }
}