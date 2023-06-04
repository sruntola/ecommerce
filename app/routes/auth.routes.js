const { verifySignup } = require("../middleware")
const controller = require("../controllers/auth.controller")
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/v1/signup",
        [
            verifySignup.checkDuplicateUsernameOrEmail
        ],
        controller.signup
    );
    app.post("/api/v1/signin", controller.signin);
    passport.use(new GoogleStrategy({
        clientID: "778937420497-gcq1h45aeoateuul6fmr88v1rr4ee5ds.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // Handle user data after successful authentication
        // Retrieve user information from the Google profile
        // Call the 'done' callback to proceed with the authentication process
    }));
    app.get('/api/v1/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
        // Generate a JWT token and return it to the client for further requests
        // The token can be used to authenticate the client in subsequent API requests
    });

};