const { User, Post, Mood } = require("../models");
// const { Op } = require("sequelize");
//post user mood
module.exports = function (app) {
  // create a new post
  app.post("/api/posts", function (req, res) {
    Post.create(req.body).then(function (dbPost) {
      res.json(dbPost);
    }).catch(err => {
      // console.log(err.message);
      res.json({ message: err.message });
    });
  });

  // get all posts by id of a logged in user
  app.get("/:username/posts", function (req, res) {
    // checks to make sure there's req.user data from the login verification and if not sends a 403 forbidden
    if (!req.user) {
      res.sendStatus(403).json({ message: "invalid user" }).redirect("/");
    } else {
      // if there IS req.user data we use that to search for the user's posts by their user id and include the Mood table to also grab mood data for each post
      // console.log("req.user", req.user);
      Post.findAll({
        include: [User, Mood],
        where: {
          UserId: req.user.id
        },
        // using raw and nest helped get the best looking data that was easiest to pick through and use for handlebars
        raw: true,
        nest: true
      }).then((dbPost) => {
        // console.log("dbPost if no posts", dbPost.length);
        // this is your handlebars object for populating the posts with their title, body, mood and includes all the user data as well
        const hbsObj = {
          post: dbPost,
          name: dbPost[0].User.name
        };
        // const postLength = dbPost.length;
        // console.log("postLength", postLength);
        // if (User === undefined) {
        //   res.json({ message: "too bad no posts" });
        //   // res.redirect(`/${req.params.username}/journal`);
        // } else {
        // }
        res.render("posts", hbsObj);
        // console.log(hbsObj);
        // console.log("dbPost", dbPost);
        // res.json(hbsObj);
        //send to the front end

      }).catch(err => {
        res.redirect(`/${req.params.username}/journal`);
      });
    }
  });

  app.delete("/api/posts/:id", function (req, res) {
    Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    }).catch(err => {
      console.log(err.message);
      res.json({ message: err.message });
    });
  });

  //Keeley's
  app.get("/:username/journal", function (req, res) {

    if (!req.user) {
      res.sendStatus(403).json({ message: "invalid user" }).redirect("/");
    } else {
      Mood.findAll({
        raw: true
      }).then(dbMood => {
        // console.log(req.user);
        const hbsObj = {
          username: req.user.username,
          id: req.user.id,
          mood: dbMood
        };
        //send to the front end
        // console.log(hbsObj);
        // res.json(hbsObj);
        res.render("journal", hbsObj);
      }).catch(err => {
        res.json({ message: err.message });
      });
    }
  });
  // find one post by id
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

  // mood routes for now
  app.post("/api/moods", (req, res) => {
    Mood.create(req.body).then(dbMood => {
      res.json(dbMood);
    }).catch(err => {
      res.json({ message: err.message });
    });
  });
};

