const Review = require("../model/reviewModel");

const profileReview = async (req, res) => {
  try {
    const bookReviews = await Review.find({ user_id: req.body.user_id });
    if (bookReviews === []) {
      res.send("No book found !!");
    } else {
      res.send(bookReviews);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
module.exports = profileReview;
