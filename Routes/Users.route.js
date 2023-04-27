const { UserModel } = require("../Models/User.model");
const bcrypt = require("bcrypt")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Authentication } = require("../Middlewares/Authentication.middleware");
const UserRouter = require("express").Router()


// ! GET ALL USERS
UserRouter.get("/", Authentication, async (req, res) => {
    let query = req.query
    console.log(query);
    try {
        let Users = await UserModel.find(query)
        res.status(200).json({ Message: " Data", Users });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});

//!  SIGNUP ROUTE
UserRouter.post("/register", async (req, res) => {
    let newuser = req.body
    try {
        let users = await UserModel.find({ email: newuser.email })
        if (users.length !== 0) {
            res.status(200).json({ Message: "You Have Already Signed Up, Please Login", exist: true, User: users[0] });
        } else {
            bcrypt.hash(newuser.password, 10, async (err, hash) => {
                if (hash) {
                    newuser.password = hash
                    let instance = new UserModel(newuser)
                    await instance.save()
                    res.status(201).json({ Message: "User Registered Successfully", instance, success: true, exist: false });
                } else {
                    res.status(400).json({ Message: "Bcrypt Error", exist: false, success: false });

                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err, exist: false, success: false })
    }
});

// ! LOGIN ROUTE
UserRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        let Users = await UserModel.find({ email })
        if (Users.length == 0) {
            res.status(200).json({ Message: "You are not registered with us, please signup", success: false, exist: false });
        } else {
            let user = Users[0]
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    jwt.sign({ userID: user._id }, process.env.key, (err, token) => {
                        if (token) {
                            res.status(200).json({ Message: "Login Successful", token, success: true, exist: true, user });
                        } else {
                            res.status(200).json({ Message: "JWT error", success: false, exist: true });
                        }
                    });
                } else {
                    res.status(200).json({ Message: "Wrong Credentials", success: false, exist: true });
                }

            })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err, success: false, exist: true })
    }
});

// ! EDIT/PATCH ROUTE
UserRouter.patch("/edit/:id", Authentication, async (req, res) => {
    let userID = req.params.id
    let payload = req.body
    try {
        let Updated = await UserModel.findByIdAndUpdate({ _id: userID }, payload)
        res.status(201).json({ Message: "User Updated Successfully", exist: true, success: true, Updated })
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err, exist: false, success: false })
    }
});

// ! DELETE ROUTE
UserRouter.delete("/delete/:id", Authentication, async (req, res) => {
    let userID = req.params.id
    try {
        let Deleted = await UserModel.findByIdAndDelete({ _id: userID })
        res.status(201).json({ Message: "User Deleted Successfully", exist: true, success: true, Deleted })
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err, exist: false, success: false })
    }
});




module.exports = { UserRouter };