module.exports = (sequelize, Sequelize) => {
    const Slide = sequelize.define('slides', {
        title: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        route: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        imageUrl: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        expiredDate: {
            type: Sequelize.DATE,
            allowNull: true
            // defaultValue: Sequelize.fn('NOW')
        }
    }, {
        underscored: true
    })
    return Slide
}