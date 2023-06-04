module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define('orderitems', {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
    }, {
        underscored: true
    })
    return OrderItem
}