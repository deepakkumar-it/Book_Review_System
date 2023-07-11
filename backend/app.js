//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { credentials } = require("./auth/passport");
const passport = require("passport");
const cors = require("cors");
const router = require("./routes/routes");
const { default: mongoose } = require("mongoose");
const { response } = require("express");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
credentials(passport);

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server started on port 8080 and db connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
