const Review = require("../model/reviewModel");
const passport = require("passport");

const addReview = async (req, res) => {
  const {
    title,
    author,
    description,
    review,
    rating,
    image,
    user_id,
    user_name,
  } = req.body;
  // if(req.isAuthenticated()){
  const newReview = new Review({
    title: title,
    author: author[0],
    description: description,
    review: review,
    user_id: user_id,
    rating: rating,
    image: image,
    user_name: user_name,
  });
  await newReview.save();
  res.send(newReview);
};

module.exports = addReview;
