const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { getUsers } = require("./queries");
const { sq } = require("./app/config/db");
const db = require("./app/model/index.model");
const app = express();
const port = 3000;
const admin = require("./app/config/admin_firebase");

const category = require("./app/controllers/category.controller");
const { async } = require("@firebase/util");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/subCategory.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/slide.routes")(app);
require("./app/routes/review.routes")(app);
require("./app/routes/purchase_course.routes")(app);
require("./app/routes/course_section.routes")(app);
require("./app/routes/favorite.routes")(app);
// require('./app/routes/lesson.routes')(app)
require("./app/routes/profile.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/device_token.routes")(app);
require("./app/routes/delivery-address.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/payment.routes")(app);
require("./app/routes/size.routes")(app);
require("./app/routes/variants.routes")(app);
require("./app/routes/gender.routes")(app);
db.sequelize.sync({ force: true });

app.listen(port, () => {
  console.log(`App port ${port}.`);
});
