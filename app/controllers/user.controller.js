const db = require("../model/index.model")
const auth = require("../config/auth.config")
const User = db.users

exports.getAllUser = async (req, res) => {
    const users = await User.findAll();
    if (!users) {
        res.status(403).send({
            success: false,
            message: "No found"
        })
    } else {
        res.status(200).send({
            success: true,
            data: users
        })
    }
}
