const db = require('../model/index.model')
const Favorite = db.favorite

exports.addProductToFavorite = async (req, res) => {
    try {
        const { product_id } = req.body
        await Favorite.create({
            userId: req.userId,
            productId: product_id
        }).then(product => {
            res.status(201).send({
                message: "Created success"
            })
        })
    } catch (ex) {
        res.status(404).send({
            message: ex
        })
    }
}

exports.removeFromFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findOne({
            where: {
                productId: req.params.id
            }
        })
        if (!favorite) {
            res.status(404).send({
                message: "invalide id"
            })
        } await Favorite.destroy({
            where: {
                productId: req.params.id
            }
        }).then(re => {
            res.status(201).send({
                message: "Removed Success"
            })
        })
    } catch (ex) {
        res.status(404).send({
            message: ex.message
        })
    }

}