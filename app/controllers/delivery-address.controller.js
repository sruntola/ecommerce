const db = require('../model/index.model')
const { Sequelize, Op } = require("sequelize");
const DeliveryAddress = db.deliveryAddress

exports.createDeliveryAddress = async (req, res) => {
    const { first_name, last_name, phone, street_no, home_no, full_address, latitute, longtitute, label, is_default } = req.body
    try {
        if (!full_address) {
            res.status(400).send({
                message: "Full address is required..."
            })
        }
        if (!latitute && !longtitute) {
            res.status(400).send({
                message: "Latitute and longtitute are required..."
            })
        }
        const deliveryAddress = await DeliveryAddress.create({
            firstName: first_name,
            lastName: last_name,
            phone: phone,
            streetNo: street_no,
            homeNo: home_no,
            fullAddress: full_address,
            latitute: latitute,
            longtitute: longtitute,
            label: label,
            isDefault: is_default,
            userId: req.userId
        })
        if (deliveryAddress) {
            await DeliveryAddress.update({
                isDefault: false
            }, {
                where: {
                    id: {
                        [Op.not]: deliveryAddress.id
                    }
                }
            })
            res.status(201).send({
                message: "Delivery address has been saved..."
            })
        }
    } catch (ex) {
        res.status(404).send({
            message: ex.message
        })
    }
}

exports.updateDeliveryAddress = async (req, res) => {
    const { first_name, last_name, phone, street_no, home_no, full_address, latitute, longtitute, label, is_default } = req.body
    try {
        if (!req.params.id) {
            res.status(404).send({
                message: "ID is required..."
            })
        }
        const deliveryAddress = await DeliveryAddress.findByPk(req.params.id)
        if (!deliveryAddress) {
            res.status(404).send({
                message: "Address doesn't exist..."
            })
        }
        const result = await DeliveryAddress.update({
            firstName: first_name,
            lastName: last_name,
            phone: phone,
            streetNo: street_no,
            homeNo: home_no,
            fullAddress: full_address,
            latitute: latitute,
            longtitute: longtitute,
            label: label,
            isDefault: is_default,
            userId: req.userId
        }, {
            where: {
                id: req.params.id
            }
        })
        const address = await DeliveryAddress.findByPk(req.params.id)
        if (address.isDefault === true) {
            await DeliveryAddress.update({
                isDefault: false
            }, {
                where: {
                    id: {
                        [Op.not]: deliveryAddress.id
                    }
                }
            })
        }
        res.status(200).send({
            message: "Delivery address was updated success..."
        })

    } catch (ex) {
        res.status(404).send(ex.message)
    }
}

exports.findAllDeliveryAddress = async (req, res) => {
    try {
        const deliveryAddress = await DeliveryAddress.findAll({
            attributes: [
                "id",
                "first_name",
                "last_name",
                "phone",
                "street_no",
                "home_no",
                "full_address",
                "latitute",
                "longtitute",
                "label",
                "is_default",
                "createdAt"
            ],
            order: [
                ['id', 'DESC']
            ],

            where: {
                userId: req.userId
            }
        })
        if (deliveryAddress) {
            res.status(200).send(deliveryAddress)
        }
    } catch (ex) {
        res.status(404).send(ex.message)
    }
}

exports.deletedAddress = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(404).send({
                message: "ID is required..."
            })
        }
        const deliveryAddress = await DeliveryAddress.findByPk(req.params.id)
        if (!deliveryAddress) {
            res.status(200).send({
                message: "Address doesn't exist..."
            })
        }
        await DeliveryAddress.destroy({
            where: {
                id: req.params.id
            }
        }).then(delivery => {
            if (delivery) {
                res.status(200).send({
                    message: "Address was deleted success..."
                })
            }
        })
    } catch (ex) {
        res.status(404).send({
            message: ex.message
        })
    }
}