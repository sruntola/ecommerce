module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING,
            allownull: false
        },
        description: {
            type: Sequelize.TEXT,
            allownull: true
        },
        price: {
            type: Sequelize.DOUBLE,
            allownull: false,
        },
        discount: {
            type: Sequelize.DOUBLE,
            defaultValue: 0.0
        },
        thumbnailUrl: {
            type: Sequelize.TEXT,
            allownull: false,
        }
    }, {
        underscored: true
    })
    return Product
}