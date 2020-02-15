const db = require("../models");
//post author mood
module.exports = function(app) {

  app.post("api/", function(req, res){
    db.Author.create(req.body).then(function(dbAuthor){
      res.json(dbAuthor);
    });
  });

  app.post("/api/", function(req, res){
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/", function(req, res) {
    db.Post.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost){
      res.json(dbPost);
    });
  });

  app.delete("/api/", function(req, res){
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost){
      res.json(dbPost);
    });
  });
};
