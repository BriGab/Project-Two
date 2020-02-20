const { User, Post } = require("../models");
const passport = require("../config/passport");
// const { Op } = require("sequelize");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

module.exports = (app) => {
    // let userdata;

    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        // console.log("req.user",req.user.id);
        res.json(req.user);
        // userdata = req.user;
        // return userdata;

        // const user = {
            //     id: 1,
            //     username: "cndbrtn",
            //     password: "password"
            // };

            // jwt.sign({ user }, "secretkey", (err, token) => {
                //     res.json({ token });
                // });
            });

    // app.get("/blog/", (req, res) => {
    //     console.log("userdata variable says: ", req.user);
    //     if (!req.user) {
    //         res.sendStatus(403);
    //     } else {
    //         Post.findAll({
    //             include: [User],
    //             where: {
    //                 UserId: req.user.id
    //             }
    //         }).then(dbPost => {
    //             res.json(dbPost);
    //         });
    //     }
    // });

    // app.get("/api/users/:id", (req, res) => {
    //     User.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then((dbUser) => {
    //         res.json(dbUser);
    //     });
    // });

    app.post("/api/users", function (req, res) {
        User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });
    // app.get("/users/:id", (req, res) => {

    //     User.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(dbUser => {
    //         res.json(dbUser);
    //     })

    //     // jwt.verify(req.token, "secretkey", (err, authData) => {
    //     //     if (err) {
    //     //         res.json({ error: err.message });
    //     //     } else {
    //     //         console.log(authData);
    //     //         Post.findAll({
    //     //             include: [User],
    //     //             where: {
    //     //                 UserId: req.params.id
    //     //             }
    //     //         }).then((dbPost) => {
    //     //             res.json(dbPost);
    //     //         });
    //     //     }
    //     // });
    // });
};

// verify user is logged in with token
// function verifyToken(req, res, next) {
//     // auth header
//     const bearerHeader = req.headers.authorization;
//     // check if undefined
//     if (typeof bearerHeader !== "undefined") {
//         // split at space to get just the token
//         const bearer = bearerHeader.split(" ");
//         // get token from split array
//         const bearerToken = bearer[0];
//         req.token = bearerToken;
//         next();
//     } else {
//         // forbidden
//         res.sendStatus(403);
//     }
// }