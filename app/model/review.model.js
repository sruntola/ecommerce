module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define('review', {
        rating: {
            type: Sequelize.DOUBLE,
            defaultValue: 0.0
        },
        reviewText: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {
        underscored: true
    })
    return Review
}