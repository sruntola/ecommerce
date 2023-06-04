module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('orders', {
        totalAmount: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        status: {
            type: Sequelize.TEXT,
            defaultValue: "New"
        }
    }, {
        underscored: true
    })
    return Order
}