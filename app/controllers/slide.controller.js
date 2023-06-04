const { response } = require('express')
const db = require('../model/index.model')
const Slide = db.slides
const getPagination = require('../utils/pagination')
const getPagingData = require('../utils/paginationData')
exports.createSlide = async (req, res) => {
    const { title, description, route, imageUrl, isActive, expiredDate } = req.body;
    if (!imageUrl) {
        res.status(403).send({
            message: "Image is Required..."
        })
    } else {
        await Slide.create({
            title: title,
            description: description,
            route: route,
            imageUrl: imageUrl,
            isActive: isActive,
            expiredDate: expiredDate
        }).then(slide => {
            res.status(201).send({
                message: "Slide was created..."
            })
        })
    }
}

exports.findAllSlide = async (req, res) => {
    const { page, size } = req.query
    try {
        // const { limit, offset } = getPagination(page, size);
        // const data = await Slide.findAndCountAll({
        //     where: {
        //         isActive: true
        //     },
        //     limit: limit,
        //     offset: offset
        // })
        const slides = await Slide.findAll({
            where: {
                is_active: true
            }
        })
        if (!slides) {
            res.status(403).send({
                message: "Slide not exist..."
            })
        } else {
            // const response = getPagingData(data, page, limit);
            res.status(200).send(slides)
        }
    } catch (ex) {
        res.status(404).send({
            message: "Error"
        })
    }
}

exports.updateSlide = async (req, res) => {
    const { title, description, route, image_url, is_active, expired_date } = req.body;
    if (!req.params.id) {
        res.status(404).send({
            message: "ID is required..."
        })
    } else {
        const slide = await Slide.findByPk(req.params.id)
        if (!slide) {
            res.status(404).send({ message: "Slide is not exisit..." })
        } else {
            await Slide.update({
                title: title,
                description: description,
                route: route,
                image_url: image_url,
                is_active: is_active,
                expired_date: expired_date
            }, {
                where: {
                    id: req.params.id
                }
            }).then(slide => {
                res.status(201).send({
                    message: "Slide was updated..."
                })
            })
        }
    }
}

exports.deleteSlide = async (req, res) => {
    const slide = await Slide.findByPk(req.params.id);
    if (!slide) {
        res.status(404).send({
            message: "Slide is not exist..."
        })
    } else {
        await Slide.destroy({
            where: {
                id: req.params.id
            }
        }).then(slide => {
            res.status(200).send({
                message: "Slide was deleted..."
            })
        })
    }
}