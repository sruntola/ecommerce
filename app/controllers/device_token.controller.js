const db = require('../model/index.model')
const DeviceToken = db.deviceToken
const notificationController = require('./notification.controller')

exports.storeDeviceToken = async (req, res) => {
    const { token, type } = req.body
    try {
        const deviceToken = await DeviceToken.create({
            token: token,
            type: type,
            userId: req.userId
        })
        if (deviceToken) {
            res.status(201).send({
                message: "Token was saved"
            })
            await notificationController.sendNotification()
        } else {
            res.status(401).send({
                message: "Failed..."
            })
        }
    } catch (ex) {
        console.log(ex)
    }
}