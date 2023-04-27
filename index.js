const { connection } = require("./Config/db");
const GoogleRouter = require("./Routes/GoogleAuth.route");
const { UserRouter } = require("./Routes/Users.route");
const cors = require("cors")
const cookieSession = require("cookie-session")

const express = require("express");
const passport = require("passport");
require("dotenv").config();

const app = express();
app.use(cors({
    origin: "https://mock7-frontend-04.netlify.app",
    allowedHeaders: ["Authorization", "Content-type", "Allow-Control-Access-Origin", "Allow-Control-Access-Credentials"],
    credentials: true
}))

app.use(cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"]
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());


app.use("/google", GoogleRouter)
app.use("/users", UserRouter)

app.get("/", (req, res) => {
    try {
        res.status(200).json({ Message: "Welcome to Authentication Fullstack App" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});


app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error connecting to DB");
    }
    console.log(`Server is Rocking on port ${process.env.PORT}`);
});
