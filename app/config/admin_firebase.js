var admin = require("firebase-admin");
var serviceAccount = require("./configfirebase_admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports.admin = admin;
