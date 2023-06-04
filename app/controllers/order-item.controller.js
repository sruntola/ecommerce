const db = require('../model/index.model')
const OrderItem = db.orderItem

exports.createOrderItem = async (req, res) => {
    const { quantity, price, order_id, variant_id, product_id } = req.body
    if (!quantity) {
        res.status(404).send({
            message: "Quantity is required..."
        })
    }
    if (!price) {
        res.status(404).send({
            message: "Price is required..."
        })
    }
    if (!order_id) {
        res.status(404).send({
            message: "Order is required..."
        })
    }
    if (!variant_id) {
        res.status(404).send({
            message: "variant id is required..."
        })
    }
    if (!product_id) {
        res.status(404).send({
            message: "product id is required..."
        })
    }
    try {
        const orderItem = await OrderItem.create({
            price: price,
            quantity: quantity,
            orderId: order_id,
            variantId: variant_id,
            productId: product_id
        })
        if (orderItem) {
            res.status(201).send({
                message: "Order Item has been submitted..."
            })
        }
    } catch (ex) {
        res.status(404).send({
            message: ex.message
        })
    }

}