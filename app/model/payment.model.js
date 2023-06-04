module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define('payments', {
        amount: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        paymentMethod: {
            type: Sequelize.TEXT,
            defaultValue: "Cash on delivery"
        }
    }, {
        underscored: true
    })
    return Payment
}