const jwt = require("jsonwebtoken")
require("dotenv").config();
const Authentication = (req, res, next) => {

    let token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ Message: "Unauthorized , security token not found" });
    }
    jwt.verify(token, process.env.key, (err, decoded) => {
        if (decoded) {
            console.log(decoded.userID)//! Token present
            next()
        } else {
            return res.status(401).json({ Message: "JWT expired" });
        }
    });


}
module.exports = { Authentication };