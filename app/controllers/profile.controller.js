const db = require('../model/index.model')
const Profile = db.profiles
const { Sequelize, Op } = require("sequelize");
const uploadImage = require('../utils/helpers')

exports.createProfile = async (req, res) => {
    const { is_latest } = req.body
    const myFile = req.file
    console.log(myFile)
    try {
        const imageUrl = await uploadImage.uploadImage(myFile)
        console.log(imageUrl)
        await Profile.create({
            imageUrl: imageUrl,
            isLatest: is_latest,
            userId: req.userId
        }).then(profile => {
            if (profile.isLatest) {
                Profile.update({
                    isLatest: false
                }, {
                    where: {
                        id: {
                            [Op.not]: profile.id
                        }
                    }
                })
            }
            res.status(200).send({
                message: "Profile was uploaded"
            })

        })
    } catch (ex) {
        res.status(404).send({
            message: ex.message
        })
    }
}