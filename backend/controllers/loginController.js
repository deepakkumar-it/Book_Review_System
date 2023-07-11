const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");
const User = require("../model/userModel");

const registerUser = (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      phone: +req.body.phone,
    });
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        res.send("User already exist");
      } else {
        passport.authenticate("local")(req, res, async (next) => {
          const user = await User.find({ username: newUser.username });
          res.status(200).json({
            message: "Successfully Logged in",
            id: user[0]._id,
            name: user[0].name,
          });
        });
      }
    });
  } catch (error) {
    res.send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      console.log("Please enter email id");
      res.send("Enter valid email id");
    } else {
      passport.authenticate("local")(req, res, async (next) => {
        const user = await User.find({ username: username });
        res.status(200).json({
          message: "Successfully Logged in",
          id: user[0]._id,
          name: user[0].name,
        });
      });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
