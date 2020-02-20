const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

passport.use(new LocalStrategy(function (username, password, done) {
    // username = "cndbrtn";
    User.findOne({
        where: {
            username: username
        }
    }).then(function (dbUser) {
        if (!dbUser) {
            return done(null, false, {
                message: "invalid username"
            });
        } else if (!dbUser.validPassword(password)) {
            return done(null, false, {
                message: "invalid password"
            });
        }

        return done(null, dbUser);
    });
}
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;