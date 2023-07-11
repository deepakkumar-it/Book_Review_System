const mongoose = require("mongoose");

checkRating = (rating) => {
  return rating > 0 && rating < 6;
};

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  author: String,
  description: String,
  review: String,
  user_id: mongoose.Schema.Types.ObjectId,
  user_name: String,
  rating: {
    type: Number,
    validate: [checkRating, "Enter proper rating"],
  },
  image: String,
});

const Review = mongoose.model("Reviews", reviewSchema);

module.exports = Review;
