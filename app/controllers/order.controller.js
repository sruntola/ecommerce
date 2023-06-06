const db = require('../model/index.model')
const Order = db.order
const DeliveryAddress = db.deliveryAddress
const OrderItem = db.orderItem
const Product = db.products
const Variant = db.variants


exports.createOrder = async (req, res) => {
    const { total_amount, status, deliveryaddress_id, prices, quantities, variant_ids, product_ids } = req.body
    if (!total_amount) {
        res.status(404).send({
            message: "Total Amount is required..."
        })
    }
    if (!deliveryaddress_id) {
        res.status(404).send({
            message: "Delivery address id is required..."
        })
    }
    try {
        const order = await Order.create({
            totalAmount: total_amount,
            status: status,
            deliveryaddressId: deliveryaddress_id,
            userId: req.userId
        })
        if (order) {
            if (!variant_ids) {
                res.status(404).send({
                    message: "Variant ID is required..."
                })
            }
            for (const index in variant_ids) {
                const orderItem = await OrderItem.create({
                    price: prices[index],
                    quantity: quantities[index],
                    orderId: order.id,
                    variantId: variant_ids[index],
                    productId: product_ids[index]
                })
                if (orderItem) {
                    res.status(201).send({
                        message: "Order Item has been submitted..."
                    })
                }
            }
            res.status(201).send({
                message: "Order has been submitted..."
            })
        }
    } catch (ex) {
        res.status(404).send(ex.message)
    }
}

exports.updateOrder = async (req, res) => {
    const { total_amount, status, deliveryaddress_id } = req.body
    if (!req.params.id) {
        res.status(404).send({
            message: "ID is required..."
        })
    }
    const order = await Order.findByPk(req.params.id)
    if (!order) {
        res.status(404).send({
            message: "Order doesn't exist..."
        })
    }
    try {
        await Order.update({
            totalAmount: total_amount,
            status: status,
            deliveryaddressId: deliveryaddress_id,
            userId: req.userId
        }, {
            where: {
                id: req.params.id
            }
        }).then(order => {
            if (order) {
                res.status(200).send({
                    message: "Order has been updated success..."
                })
            }
        })
    } catch (ex) {
        res.status(404).send(ex.message)
    }
}

exports.deleteOrder = async (req, res) => {
    if (!req.params.id) {
        res.status(404).send({
            message: "ID is required..."
        })
    }
    try {
        const order = await Order.findByPk(req.params.id)
        if (!order) {
            res.status(404).send({
                message: "Order doesn't exist..."
            })
        }
        await Order.destroy({
            where: {
                id: req.params.id
            }
        }).then(order => {
            res.status(200).send({ message: "Order has been deleted..." })
        })
    } catch (ex) {
        res.status(404).send(ex.message)
    }
}

exports.findAllOrder = async (req, res) => {
    try {
        const orders = await Order.findAll({
            attributes: [
                "id",
                "total_amount",
                "status",
                "created_at",
                "updated_at"
            ],
            order: [
                ['id', 'DESC']
            ],
            where: {
                userId: req.userId
            },
            include: [
                {
                    model: DeliveryAddress,
                    attributes: [
                        "id",
                        "street_no",
                        "home_no",
                        "full_address",
                        "latitute",
                        "longtitute"
                    ]
                },
                {
                    model: OrderItem,
                    attributes: [
                        "id",
                        "quantity",
                        "price",
                        "order_id"
                    ],
                    include: [
                        {
                            model: Product,
                            attributes: [
                                "id",
                                "name",
                                "thumbnail_url"
                            ]
                        },
                        {
                            model: Variant,
                            attributes: [
                                "id",
                                "name",
                                "image_url",
                                "colors"
                            ]
                        }
                    ]
                }
            ]
        })
        if (orders) {
            res.status(200).send(orders)
        }
    } catch (ex) {
        res.status(404).send({
            message: ex.message
        })
    }
}

exports.findInvoiceByOrderId = async (req, res) => {
    try {
        const invoice = await Order.findByPk(req.params.id, {
            attributes: [
                "id",
                "total_amount",
                [db.sequelize.literal(`SUM((orderitems.price)*(orderitems.quantity))`), 'total_amount'],
                "status",
                "created_at",
                "updated_at"
            ],
            order: [
                ['id', 'DESC']
            ],
            where: {
                userId: req.userId
            },
            include: [
                {
                    model: DeliveryAddress,
                    attributes: [
                        "id",
                        "street_no",
                        "home_no",
                        "full_address",
                        "latitute",
                        "longtitute"
                    ]
                },
                {
                    model: OrderItem,
                    attributes: [
                        "id",
                        "quantity",
                        "price",
                        [db.sequelize.literal(`(orderitems.price)*(orderitems.quantity)`), 'total_price']
                    ],
                    include: [
                        {
                            model: Product,
                            attributes: [
                                "id",
                                "name",
                                "thumbnail_url",
                                "discount"
                            ]
                        },
                        {
                            model: Variant,
                            attributes: [
                                "id",
                                "name",
                                "image_url",
                                "colors",
                                "size"
                            ]
                        }
                    ]
                }
            ],
            group: ['orders.id', 'deliveryaddress.id', 'orderitems.id', 'orderitems.product.id', 'orderitems.variant.id']
        })
        if (!invoice) {
            res.status(404).send({
                message: "Invoice not found at this order"
            })
        }
        res.status(200).send(invoice)


    } catch (ex) {
        res.status(404).send(ex.message)
    }
}