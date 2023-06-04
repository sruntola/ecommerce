const db = require('../model/index.model')
const Vairant = db.variants

exports.createVariant = async (req, res) => {
    const { name, image_url, price, quantity, colors, product_id } = req.body
    if (!name) {
        res.status(404).send({
            message: "name is required..."
        })
    }
    if (!image_url) {
        res.status(404).send({
            message: "image url is required..."
        })
    }
    if (!price) {
        res.status(404).send({
            message: "price is required..."
        })
    }
    if (!quantity) {
        res.status(404).send({
            message: "quantity is required..."
        })
    }
    if (!colors) {
        res.status(404).send({
            message: "colors is required..."
        })
    } if (!product_id) {
        res.status(404).send({
            message: "Product Id is required..."
        })
    }

    try {
        await Vairant.create({
            name: name,
            imageUrl: image_url,
            price: price,
            quantity: quantity,
            colors: colors,
            productId: product_id
        }).then(variant => {
            if (variant) {
                res.status(201).send({
                    message: "Variant was add to product"
                })
            }
        })
    } catch (ex) {
        res.status(403).send(ex.message)
    }
}
exports.updateVariant = async (req, res) => {
    const { name, image_url, price, quantity, colors, product_id } = req.body
    try {
        const variant = await Vairant.findByPk(req.params.id)
        if (!variant) {
            res.status(404).send({
                message: "Variant not found... try again!"
            })
        }
        await Vairant.update({
            name: name,
            imageUrl: image_url,
            price: price,
            quantity: quantity,
            colors: colors,
            productId: product_id
        }, {
            where: {
                id: req.params.id
            },
        }).then(variant => {
            if (variant) {
                res.status(200).send({
                    message: "Variant was updated..."
                })
            }
        })
    } catch (ex) {
        res.status(403).send({
            message: ex.message
        })
    }
}
exports.deleteVariant = async (req, res) => {
    try {
        const variant = await Vairant.findByPk(req.params.id)
        if (!variant) {
            res.status(404).send({
                message: "Variant not found... try again!"
            })
        }
        await Vairant.destroy({
            where: {
                id: req.params.id
            }
        }).then(variant => {
            if (variant) {
                res.status(200).send({
                    message: "Variant was deleted.."
                })
            }
        })
    } catch (ex) {
        res.status(403).send({ message: ex.message })
    }
}

exports.findAllVariant = async (req, res) => {
    try {
        const variants = await Vairant.findAll({
            attributes: [
                "id",
                "name",
                "image_url",
                "price",
                "quantity",
                "colors"
            ]
        })
        if (variants) {
            res.status(200).send(variants)
        }
    } catch (ex) {
        res.status(404).send({ message: ex.message })
    }
}