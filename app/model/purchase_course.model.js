const db = require('../model/index.model')

module.exports = (sequelize, Sequelize) => {
    const PurchasedCourse = sequelize.define('purchased_course', {
        purchasePrice: {
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    }, {
        underscored: true
    })
    return PurchasedCourse
}