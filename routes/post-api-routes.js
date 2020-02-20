const { User, Post, Mood } = require("../models");
// const { Op } = require("sequelize");
//post user mood
module.exports = function(app) {
  app.post("/api/posts", function(req, res){
    Post.create(req.body).then(function(dbPost) {
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

  app.delete("/api/posts/:id", function(req, res){
    Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost){
      res.json(dbPost);
    });
  });
};

