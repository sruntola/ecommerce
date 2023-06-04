const db = require('../model/index.model')
const PurchasedCourse = db.purchased_course

exports.createPurchaseCourse = async (req, res) => {
    const { purchasePrice, courseId } = req.body
    try {
        await PurchasedCourse.create({
            purchasePrice: purchasePrice,
            userId: req.userId,
            courseId: courseId
        }).then(pc => {
            res.status(200).send({
                message: "Purchase has been submitted"
            })
        })
    } catch (ex) {
        res.status(404).send({ message: ex })
    }
}

exports.findAllPurchaseRequestByUser = async (req, res) => {
    try {
        const purchaseCourses = await PurchasedCourse.findAll({
            where: {
                userId: req.userId
            }
        })
    } catch (ex) {

    }
}

