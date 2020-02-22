const path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signin.html"));
  }).catch(err => {
    res.json({ message: err.message });
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/.html"));
  }).catch(err => {
    res.json({ message: err.message });
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/.html"));
  }).catch(err => {
    res.json({ message: err.message });
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/.html"));
  }).catch(err => {
    res.json({ message: err.message });
  });

};
