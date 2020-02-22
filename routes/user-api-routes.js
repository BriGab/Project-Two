const { User } = require("../models");
const passport = require("../config/passport");
// const { Op } = require("sequelize");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

module.exports = (app) => {
    // uses POST method to post user login data (username and password) to api/login so that it can be grabbed by the back end, verified, and redirected
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        // console.log("req.user",req.user.id);
        console.log(req.user);
        // this sends the req.user data we posted to the api so that it can be grabbed by the back end
        res.json(req.user);
    });
    // create a new user either with POST function at /api/users in postman or via signup form in the app
    app.post("/api/users", function (req, res) {
        User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });
};