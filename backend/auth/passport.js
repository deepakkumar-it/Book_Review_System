const passport = require("passport");
const User = require("../model/userModel");

const credentials = passport => {
  passport.use(User.createStrategy());

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

module.exports = {
    credentials
}