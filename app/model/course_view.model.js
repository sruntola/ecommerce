module.exports = (sequelize, Sequelize) => {
    const CourseViews = sequelize.define('course_views', {

    }, {
        underscored: true
    })
    return CourseViews
}