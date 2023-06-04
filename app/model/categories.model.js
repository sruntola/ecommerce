const { DataTypes } = require("sequelize")
module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("categories", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        icon: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    }, {
        underscored: true
    })
    return Categories
}