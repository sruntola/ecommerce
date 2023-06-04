const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize('tsharedatabase', 'me', 'password', {
//     host: 'localhost',
//     dialect: 'postgres',
//     port: 5432,

// })
// const connectionString = `${process.env.DATABASE_URL}`
// const sequelize = new Sequelize(connectionString)

const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

// const User = sequelize.define("users", {
//     first_name: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     last_name: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     is_instructor: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     }
// });
// sequelize.sync({ force: true })
// module.exports = {
//     sq: sequelize, testDbConnection
// }