const { Mood, User, Post, Comment } = require("../models");
// delete routes for everything
module.exports = app => {
    // delete a user by id
    app.delete("/api/users/:id", (req, res) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbUser => {
            res.sendStatus(200);
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
            res.sendStatus(200);
        }).catch(err => {
            res.json({ message: err.message });
        });
    });
    // delete a post by id
    app.delete("/api/posts/:id", (req, res) => {
        Post.destroy({
            include: [Comment],
            where: {
                id: req.params.id
            }
        }).then(dbPost => {
            res.json(dbPost);
        }).catch(err => {
            console.log(err);
        });
    });

    // for comments
    app.delete("/api/comments/:id", (req, res) => {
        Comment.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbComm => {
            res.json(dbComm)
        }).catch(err => {
            res.json({ message: err.message });
        });
    });
};