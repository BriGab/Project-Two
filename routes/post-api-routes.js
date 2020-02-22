const { User, Post, Mood } = require("../models");
// const { Op } = require("sequelize");
//post user mood
module.exports = function (app) {
  // create a new post
  app.post("/api/posts", function (req, res) {
    Post.create(req.body).then(function (dbPost) {
      res.json(dbPost);
    });
  }).catch(err => {
    console.log(err.message);
    res.json({ message: err.message });
  });
  // get all posts by id of a logged in user
  app.get("/:username/posts", function (req, res) {
    // checks to make sure there's req.user data from the login verification and if not sends a 403 forbidden
    if (!req.user) {
      res.sendStatus(403).json({ message: "invalid user" }).redirect("/");
    } else {
      // if there IS req.user data we use that to search for the user's posts by their user id and include the Mood table to also grab mood data for each post
      console.log(req.user);
      Post.findAll({
        include: [User, Mood],
        where: {
          UserId: req.user.id
        },
        // using raw and nest helped get the best looking data that was easiest to pick through and use for handlebars
        raw: true,
        nest: true
      }).then((dbPost) => {

        // this is your handlebars object for populating the posts with their title, body, mood and includes all the user data as well
        const hbsObj = {
          post: dbPost,
          name: dbPost[0].User.name
        };
        // console.log(hbsObj);
        // console.log("dbPost", dbPost);
        // res.json(hbsObj);
        //send to the front end
        res.render("posts", hbsObj);
      });
    }
  }).catch(err => {
    console.log(err.message);
    res.json({ message: err.message });
  });
};

