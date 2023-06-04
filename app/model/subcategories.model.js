const { DataTypes } = require("sequelize")
module.exports = (sequelize, Sequelize) => {
    const SubCategories = sequelize.define("subcategories", {
        name: {
            type: DataTypes.TEXT,
            allownull: false
        }
    }, {
        underscored: true
    })
    return SubCategories
}