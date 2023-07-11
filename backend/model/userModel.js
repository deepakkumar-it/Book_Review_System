//jshint esversion:6

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

validatePhone = (phone) => {
  return phone.toString().length === 10;
};

const userSchema = new mongoose.Schema({
  name: String,
  phone: {
    type: Number,
    trim: true,
    validate: [validatePhone, "Enter a valid phone number"],
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: "Email id is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: String,
  secret: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;
