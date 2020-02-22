const { User, Post, Mood } = require("../models");
// const { Op } = require("sequelize");
//post user mood
module.exports = function (app) {
  app.post("/api/posts", function (req, res) {
    Post.create(req.body).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/:username/posts", function (req, res) {

    if (!req.user) {
      res.sendStatus(403).json({ message: "invalid user" });
    } else {
      console.log(req.user);
      Post.findAll({
        include: [User, Mood],
        where: {
          UserId: req.user.id
        },
        raw: true,
        nest: true
      }).then((dbPost) => {

        const hbsObj = {
          post: dbPost,
          name: dbPost[0].User.name
        };
        //send to the front end
        console.log(hbsObj);
        // res.json(hbsObj);
        res.render("posts", hbsObj);
      });
    };
  });

  app.delete("/api/posts/:id", function (req, res) {
    Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  //Keeley's
  app.get("/:username/journal", function (req, res) {

    if (!req.user) {
      res.sendStatus(403).json({ message: "invalid user" });
    } else {
      console.log(req.user);
      const hbsObj = {
        username: req.user.username,
        id: req.user.id
      };
      //send to the front end
      console.log(hbsObj);
      // res.json(hbsObj);
      res.render("journal", hbsObj);
    };
  });

  app.get("/api/posts/:id", function (req, res) {
    Post.findOne({
      where: {
        id: req.params.id
      }, include: [User, Mood]
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};

