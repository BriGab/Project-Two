const { User, Post, Mood } = require("../models");

module.exports = function(app) {

  //updating a post
  app.put("/api/posts/:id", function(req, res){
    Post.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function(err){
      res.sendStatus(500).send(err)
    });
  });

  //updating a username
  app.put("/api/users/:id", function(req, res){
    User.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err){
      res.sendStatus(500).send(err)
    });
  });

  //updating mood
  app.put("/api/mood/:id", function(req, res){
    req.body;
    Mood.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbMood){
      res.json(dbMood);
    })
    .catch(function(err){
      res.sendStatus(500).send(err)
    });
  });

};