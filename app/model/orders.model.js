module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('orders', {
        totalAmount: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
    }, {
        underscored: true
    })
    return Order
}