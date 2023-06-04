const db = require('../model/index.model')
const Review = db.reviews
const User = db.users
const Course = db.courses

exports.addReview = async (req, res) => {
    console.log(req.userId)
    const { rating, review_text, product_id } = req.body
    if (!rating) {
        res.status(404).send({
            message: "Rating Field is required..."
        })
    } else {
        await Review.create({
            rating: rating,
            reviewText: review_text,
            userId: req.userId,
            productId: product_id
        }).then(review => {
            res.status(201).send({
                message: "Thanks for Rating"
            })
        }).catch(ex => {
            res.status(403).send(ex)
        });
    }
}

exports.findAllReview = async (req, res) => {
    const review = await Review.findAll()
    if (!review) {
        res.status(404).sned({
            message: "Not found"
        })
    } else {
        res.status(200).send({
            data: review
        })
    }
}

exports.findAllReviewByCourse = async (req, res) => {
    const review = await Review.findAll({
        where: {
            productId: req.query.product_id
        }
    })
    if (!review) {
        res.status(404).sned({
            message: "Not found"
        })
    } else {
        res.status(200).send({
            data: review
        })
    }
}

exports.updateReview = async (req, res) => {
    // const review = await Review.findByPk(req.params.id)
    console.log("ID: ", req.query.id)
    // try {
    //     if (!review) {
    //         res.status(404).send({
    //             message: "ID is invalid"
    //         })
    //     } else {
    //         const { rating, reviewText, courseId } = req.body
    //         await Review.update({
    //             rating: rating,
    //             reviewText: reviewText,
    //             userId: req.userId,
    //             courseId: courseId
    //         }, {
    //             where: {
    //                 id: req.params.id
    //             }
    //         }).then(review => {
    //             res.status(201).send({
    //                 message: "Thanks for Rating"
    //             })
    //         }).catch(ex => {
    //             res.status(403).send(ex)
    //         });
    //     }
    // } catch (ex) {
    //     res.status(404).send({
    //         message: ex
    //     })
    // }
}

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id)
        if (!review) {
            res.status(404).send({
                message: "Id is invalid"
            })
        } else {
            await Review.destroy({
                where: {
                    id: req.params.id
                }
            }).then(review => {
                res.status(200).send({
                    message: "You have deleted review successful"
                })
            })
        }
    } catch (ex) {
        res.status(404).send({
            message: ex
        })
    }
}