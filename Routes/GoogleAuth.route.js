const GoogleRouter = require("express").Router()
const passport = require("passport")
// const { UserModel } = require("../Models/User.model")
let HOST = "https://mock7-frontend-04.netlify.app"
require("../Config/Google.auth")
GoogleRouter.get("/", passport.authenticate('google', { scope: ["email", "profile"] }))

GoogleRouter.get("/callback",
    passport.authenticate('google', {
        successRedirect: "/google/auth/success",
        failureRedirect: "/google/auth/failure"
    }))


//! GOOGLE AUTH SUCCESS
GoogleRouter.get('/auth/success', async (req, res) => {
    if (!req.user) {
        return res.redirect("/google/auth/failure")
    }
    let googleData = {
        name: req.user.displayName,
        email: req.user.email,
        image: req.user.photos[0].value,
        password: req.user.email,
        bio: "",
        phone: 1234567890
    }
    res.redirect(`${HOST}/profile.html?succes="true`)
    console.log(googleData);
})

// !Google Auth Failure
GoogleRouter.get("/auth/failure", (req, res) => {
    res.redirect(`${HOST}/failure.html`)
})
//! Google Auth Login

GoogleRouter.post("/login", (req, res) => {
    let id = req.body.userid
    res.json({ send: "find by id and send user details", id })
})


// ! Google Logout
GoogleRouter.get("/logout", (req, res) => {
    req.session = null
    req.logout()
    res.json({ Message: "Logged out successfully" })
})
module.exports = GoogleRouter