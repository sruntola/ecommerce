const { DataTypes } = require("sequelize")

module.exports = (sequelize, Sequelize) => {
    const Tags = sequelize.define("tages", {
        title: {
            type: DataTypes.TEXT,
            allownull: false
        }
    }, {
        underscored: true
    })
    return Tags
}