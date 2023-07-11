const Review = require("../model/reviewModel");

const viewReview = async (req, res) => {
  try {
    const bookReviews = await Review.find();
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
module.exports = viewReview;
