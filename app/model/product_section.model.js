module.exports = (sequelize, Sequelize) => {
    const ProductSection = sequelize.define('product_sections', {
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        underscored: true
    })
    return ProductSection
}