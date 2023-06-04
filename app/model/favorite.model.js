module.exports = (sequelize, Sequelize) => {
    const Favorite = sequelize.define('favorite', {

    }, {
        underscored: true
    })
    return Favorite
}