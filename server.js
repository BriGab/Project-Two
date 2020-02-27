const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const exphbs = require("express-handlebars");
// const loggingHelpers = require ("logging-helpers")

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

// passport setup
app.use(session({ secret: "get money", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// dotenv setup
require("dotenv").config();

// Routes
// =============================================================

require("./routes/html-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/update-routes.js")(app);
require("./routes/delete-routes")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});
