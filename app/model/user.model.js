module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstName: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        phoneNumber: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        isInstructor: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        bio: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        skills: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: []
        },
    }, {
        underscored: true
    })
    return User
}