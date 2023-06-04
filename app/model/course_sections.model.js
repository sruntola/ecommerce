const { DataTypes } = require("sequelize")

module.exports = (sequelize, Sequelize) => {
    const CourseSections = sequelize.define("course_sections", {
        title: {
            type: DataTypes.TEXT,
            allownull: false
        }
    }, {
        underscored: true
    })
    return CourseSections
}