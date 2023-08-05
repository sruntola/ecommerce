module.exports = (sequelize, Sequelize) => {
    const DeliveryAddress = sequelize.define('deliveryaddresses', {
        firstName: {
            type: Sequelize.TEXT,
            allownull: false
        },
        lastName: {
            type: Sequelize.TEXT,
            allownull: false
        },
        phone: {
            type: Sequelize.TEXT,
            allownull: false
        },
        streetNo: {
            type: Sequelize.TEXT,
            allownull: true
        },
        homeNo: {
            type: Sequelize.TEXT,
            allownull: true
        },
        fullAddress: {
            type: Sequelize.TEXT,
            allownull: false
        },
        latitute: {
            type: Sequelize.DOUBLE,
            allownull: false
        },
        longtitute: {
            type: Sequelize.DOUBLE,
            allownull: false
        },
        label: {
            type: Sequelize.TEXT,
            defaultValue: "Home"
        },
        isDefault: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        underscored: true
    })
    return DeliveryAddress
}