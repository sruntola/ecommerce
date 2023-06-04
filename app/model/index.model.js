const Sequelize = require("sequelize");
const categories = require("./categories.model")
const subCategories = require("./subcategories.model")
// const sequelize = new Sequelize('ecommerce-db', 'me', 'password', {
//     host: 'localhost',
//     dialect: 'postgres',
//     port: 5432
// })
const connectionString = `${process.env.DATABASE_URL}`
const sequelize = new Sequelize(connectionString)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categories = require("./categories.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize)
db.slides = require("./slides.model")(sequelize, Sequelize)
db.products = require("./products.model")(sequelize, Sequelize)
db.variants = require("./variants.model")(sequelize, Sequelize)
db.reviews = require("./review.model")(sequelize, Sequelize)
db.favorite = require("./favorite.model")(sequelize, Sequelize)
db.carts = require("./carts.model")(sequelize, Sequelize)
db.deliveryAddress = require("./customer-address.model")(sequelize, Sequelize)
db.order = require("./orders.model")(sequelize, Sequelize)
db.orderItem = require("./order-items.model")(sequelize, Sequelize)
db.payment = require("./payment.model")(sequelize, Sequelize)
db.order.hasMany(db.payment)
db.payment.belongsTo(db.order)
db.order.hasMany(db.orderItem)
db.users.hasMany(db.payment)
db.payment.belongsTo(db.users)
db.variants.hasMany(db.orderItem)
db.products.hasMany(db.orderItem)
db.order.belongsTo(db.deliveryAddress)
db.orderItem.belongsTo(db.products)
db.orderItem.belongsTo(db.variants)
db.users.hasMany(db.order)
db.deliveryAddress.hasMany(db.order)
db.users.hasMany(db.deliveryAddress)
db.products.hasMany(db.carts)
db.variants.hasMany(db.carts)
db.carts.belongsTo(db.variants)
db.carts.belongsTo(db.products)
db.users.hasMany(db.carts)
db.carts.belongsTo(db.users)
db.users.hasMany(db.favorite)
db.favorite.belongsTo(db.users)
db.products.hasMany(db.favorite)
db.products.hasMany(db.reviews)
db.reviews.belongsTo(db.products)
db.reviews.belongsTo(db.users)
db.users.hasMany(db.reviews)
db.users.hasMany(db.products)
db.products.belongsTo(db.users)
db.categories.hasMany(db.products)
db.products.hasMany(db.variants)
module.exports = db;