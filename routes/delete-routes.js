const { Mood, User, Post } = require("../models");
// delete routes for everything
module.exports = function (app) {
    // delete a user by id
    app.delete("/api/users/:id", (req, res) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        }).then((dbUser) => {
            res.sendStatus(200).json({
                message: `user deleted ${dbUser}`
            });
        }).catch(err => {
            res.json({ message: err.message });
        });
    });
    // delete a mood by id
    app.delete("/api/moods/:id", (req, res) => {
        Mood.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbMood => {
            res.sendStatus(200).json({
                message: `mood deleted ${dbMood}`
            });
        }).catch(err => {
            res.json({ message: err.message });
        });
    });
    // delete a post by id
    app.delete("/api/posts/:id", function (req, res) {
        Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.sendStatus(200).json(dbPost);
        }).catch(err => {
            res.json({ message: err.message });
        });
    });
};