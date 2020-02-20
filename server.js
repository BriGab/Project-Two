const express = require("express");
const session = require("express-session");
const passport = require("./config/passport")
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// passport
app.use(session({ secret: "get money", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/update-routes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}/posts`);
  });
});
