const Review = require("../model/reviewModel");

const deleteReview = async (req, res) => {
  try {
    const id = req.body.id;
    await Review.findByIdAndDelete(id).then(res.send("Deleted successfully"));
  } catch (error) {
    res.send(error);
  }
};

module.exports = deleteReview;
