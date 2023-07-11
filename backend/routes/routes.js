const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/loginController");
const viewReview = require("../controllers/viewReviewController");
const addReview = require("../controllers/addReviewController");
const profileReview = require("../controllers/profileController");
const deleteReview = require("../controllers/deleteReview");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/add-review", addReview);
router.post("/profile", profileReview);
router.post("/delete", deleteReview);
router.get("/", viewReview);

module.exports = router;
