const passport = require("passport")
require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth2").Strategy

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})


passport.use(new GoogleStrategy({
    clientID: "508864615738-leqrhc0spsera4t23np8tnr553cg052m.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://mock7-backend.vercel.app/google/callback",
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    console.log(profile)// ! Will remove ;
    return done(null, profile)
}))