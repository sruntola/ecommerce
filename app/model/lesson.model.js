module.exports = (sequelize, Sequelize) => {
    const Lesson = sequelize.define('lesson', {
        title: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        url: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        isPaid: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        durationSec: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

    }, {
        underscored: true
    })
    return Lesson
}