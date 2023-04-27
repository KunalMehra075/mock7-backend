const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    image: { type: String, require: true, default: "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png" },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    bio: { type: String, require: true },
})
const UserModel = mongoose.model("Users", UserSchema)
module.exports = { UserModel };