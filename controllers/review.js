const Review = require("../models/Review");
const Movie = require("../models/Movie");
const Comment = require("../models/Comment");

// Add a new review
exports.addReview = async (req, res) => {
  const { text, rating, user } = req.body;
  const { movieId } = req.params;

  try {
    // Create the review
    const review = new Review({ text, rating, user });
    await review.save();

    // Update the movie with the new review
    const movie = await Movie.findByIdAndUpdate(
      movieId,
      { $push: { reviews: review._id } },
      { new: true }
    ).populate("reviews");

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(201).json({ review, movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user comments");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "user comments"
    );
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("user comments");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review by ID and remove it from the movie
exports.deleteReview = async (req, res) => {
  const { id, movieId } = req.params;

  try {
    // Delete the review
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Remove the review from the movie
    const movie = await Movie.findByIdAndUpdate(
      movieId,
      { $pull: { reviews: id } },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Review deleted successfully", movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.upvoteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review upvoted successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addCommentToReview = async (req, res) => {
  const { id } = req.params; // Review ID
  const { text, user } = req.body; // Comment text and user ID

  try {
    // Create a new comment
    const comment = new Comment({ text, user });
    await comment.save();

    // Add the comment to the review
    const review = await Review.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      { new: true }
    ).populate("comments");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res
      .status(201)
      .json({ message: "Comment added successfully", comment, review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top-rated reviews for a movie
exports.getTopRatedReviews = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId).populate({
      path: "reviews",
      options: {
        sort: { upvotes: -1, createdAt: -1 }, // Sort by upvotes and recent activity
        limit: 5, // Adjust limit if needed
      },
      populate: { path: "user comments" }, // Populate related data
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ reviews: movie.reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
