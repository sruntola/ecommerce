
module.exports = (sequelize, Sequelize) => {
    const Variant = sequelize.define("variants", {
        name: {
            type: Sequelize.TEXT,
            allownull: false
        },
        imageUrl: {
            type: Sequelize.TEXT,
            allownull: false
        },
        price: {
            type: Sequelize.DOUBLE,
            allownull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allownull: false
        },
        size: {
            type: Sequelize.INTEGER,
            allownull: false
        },
        colors: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: []
        },
    }, {
        underscored: true
    })
    return Variant
}