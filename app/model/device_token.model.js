module.exports = (sequelize, Sequelize) => {
    const DeviceToken = sequelize.define('device_tokens', {
        token: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return DeviceToken
}