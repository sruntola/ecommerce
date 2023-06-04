
const db = require('../model/index.model')
const Lesson = db.lesson
const uploadImage = require('../utils/helpers')
// const { getVideoDurationInSeconds } = require('get-video-duration')

exports.createLesson = async (req, res) => {
    const { title, description, is_paid, course_section_id, duration_sec, course_id } = req.body
    const myFile = req.file
    console.log(myFile)
    try {
        const videoUrl = await uploadImage.uploadImage(myFile)
        console.log("Video Url", videoUrl)
        // const videoDuration = await getVideoDurationInSeconds(imageUrl)
        // console.log('Original Duration:', videoDuration)
        // const durationSeconds = Math.floor(videoDuration)
        // console.log('After Duration:', durationSeconds)
        if (videoUrl) {
            await Lesson.create({
                title: title,
                description: description,
                url: videoUrl,
                isPaid: is_paid,
                durationSec: duration_sec,
                userId: req.userId,
                courseSectionId: course_section_id,
                courseId: course_id
            }).then(lesson => {
                res.status(201).send({
                    lesson
                })
            })
        } else {
            res.status(404).send({ message: "Error" })
        }

    } catch (ex) {
        res.status(404).send({ message: ex.message })
    }
}



