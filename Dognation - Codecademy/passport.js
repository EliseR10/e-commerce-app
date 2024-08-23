const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const helper = require("../helpers/helper");

// Set up the Passport strategy:
passport.use(new LocalStrategy(
  function(username, password, done) {
    helper.findByUsername(username, async (err, user) => {
      //check if error is found
      if (err) return done(err);

      //check if user is not found
      if (!user) return done(null, false);

      //compare the plaintext password & hashed password
      const matchedPassword = await bcrypt.compare(password, user.password);

      //user found but invalid password
      if (!matchedPassword) return done(null, false);

      //if successfully found user
      return done(null, user);

    });
  }
));
// Serialize a user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// Deserialize a user
passport.deserializeUser((id, done) => {
  helper.findById(id, function (err, user) {
    if (err) return done(err);

    //if no error and retrieved the users
    done(null, user);
  });
});