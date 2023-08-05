const { Sequelize, DataTypes } = require("sequelize");
const categories = require("./categories.model");
const subCategories = require("./subcategories.model");

// const sequelize = new Sequelize("ecommerce-db", "postgres", "tola", {
//     host: "localhost",
//     dialect: "postgres",
//     port: 5432,
// });
const connectionString = `${process.env.DATABASE_URL}`;
const sequelize = new Sequelize(connectionString);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// add column to existing table
// const queryInterface = sequelize.getQueryInterface();
// queryInterface.addColumn(
//   "users",
//   "dateOfBirth",
//   {
//     type: DataTypes.DATE,
//   },
//   {
//     underscored: true,
//   }
// );
db.categories = require("./categories.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.slides = require("./slides.model")(sequelize, Sequelize);
db.products = require("./products.model")(sequelize, Sequelize);
// db.variants = require("./variants.model")(sequelize, Sequelize);
db.reviews = require("./review.model")(sequelize, Sequelize);
db.favorite = require("./favorite.model")(sequelize, Sequelize);
db.carts = require("./carts.model")(sequelize, Sequelize);
db.deliveryAddress = require("./customer-address.model")(sequelize, Sequelize);
db.order = require("./orders.model")(sequelize, Sequelize);
db.orderItem = require("./order-items.model")(sequelize, Sequelize);
db.payment = require("./payment.model")(sequelize, Sequelize);
db.productSection = require("./product_section.model")(sequelize, Sequelize);
db.deviceToken = require("./device_token.model")(sequelize, Sequelize);
db.sizes = require("./sizes.model")(sequelize, Sequelize);
db.variants = require("./variants.model")(sequelize, Sequelize);
db.profiles = require("./profiles.model")(sequelize, Sequelize);
db.genders = require("./genders.model")(sequelize, Sequelize);
db.roles = require("./roles.model")(sequelize, Sequelize)
db.orderStatus = require("./order_sratus.model")(sequelize, Sequelize)
db.users.hasMany(db.profiles);
db.roles.hasMany(db.users)
db.users.belongsTo(db.roles);
db.genders.hasMany(db.users);
db.users.belongsTo(db.genders);
db.sizes.hasMany(db.orderItem);
db.orderItem.belongsTo(db.sizes);
db.variants.hasMany(db.orderItem);
db.orderItem.belongsTo(db.variants);
db.orderStatus.hasMany(db.order)
db.order.belongsTo(db.orderStatus)
db.productSection.hasMany(db.products);
db.products.belongsTo(db.productSection);
db.order.hasMany(db.payment);
db.payment.belongsTo(db.order);
db.order.hasMany(db.orderItem);
db.users.hasMany(db.payment);
db.payment.belongsTo(db.users);
db.products.hasMany(db.variants);
db.variants.belongsTo(db.products);
// db.variants.hasMany(db.orderItem);
// db.variants.hasMany(db.colors);
// db.colors.belongsTo(db.variants);
// db.sizes.hasMany(db.colors);
// db.colors.belongsTo(db.sizes);
db.variants.hasMany(db.sizes);
db.sizes.belongsTo(db.variants);
db.products.hasMany(db.orderItem);
// db.variants.hasMany(db.sizes);
// db.sizes.belongsTo(db.variants);
db.order.belongsTo(db.deliveryAddress);
db.orderItem.belongsTo(db.products);
// db.orderItem.belongsTo(db.variants);
db.users.hasMany(db.order);
db.deliveryAddress.hasMany(db.order);
db.users.hasMany(db.deliveryAddress);
db.variants.hasMany(db.carts);
db.products.hasMany(db.carts)
db.carts.belongsTo(db.products)
db.carts.belongsTo(db.variants);
db.sizes.hasMany(db.carts);
db.carts.belongsTo(db.sizes);
// db.variants.hasMany(db.carts);
// db.carts.belongsTo(db.variants);
db.users.hasMany(db.carts);
db.carts.belongsTo(db.users);
db.users.hasMany(db.favorite);
db.favorite.belongsTo(db.users);
db.products.hasMany(db.favorite);
// db.variants.hasMany(db.favorite);
// db.favorite.belongsTo(db.variants);
db.favorite.belongsTo(db.products);
db.products.hasMany(db.reviews);
db.reviews.belongsTo(db.products);
db.reviews.belongsTo(db.users);
db.users.hasMany(db.reviews);
db.users.hasMany(db.products);
db.products.belongsTo(db.users);
db.categories.hasMany(db.products);
// db.products.hasMany(db.variants);
db.users.hasMany(db.deviceToken);
db.deviceToken.belongsTo(db.users);
module.exports = db;
