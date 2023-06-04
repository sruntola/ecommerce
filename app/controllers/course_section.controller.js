const db = require('../model/index.model')
const CourseSection = db.course_section

exports.createCourseSection = async (req, res) => {
    const { title, course_id } = req.body
    console.log(course_id)
    await CourseSection.create({
        title: title,
        courseId: course_id
    }).then(cs => {
        res.status(201).send({
            message: "Course Section created..."
        })
    })
}

exports.findAllCourseSection = async (req, res) => {
    const courseSection = await CourseSection.findAll()
    if (!courseSection) {
        res.status(404).send({
            message: "Something went wrong"
        })
    } else {
        res.status(200).send(courseSection)
    }
}