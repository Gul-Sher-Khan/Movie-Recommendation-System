const express = require("express");
const router = express.Router();
const {
  addReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  upvoteReview,
  addCommentToReview,
  getTopRatedReviews,
} = require("../controllers/review");

// Route to add a review to a movie
router.post("/:movieId", addReview);

// Route to get all reviews
router.get("/", getAllReviews);

// Route to get, update, or delete a specific review
router.route("/:id").get(getReviewById).put(updateReview);

router.route("/:id/:movieId").delete(deleteReview);

// Route to upvote a review
router.put("/:id/upvote", upvoteReview);

// Route to add a comment to a review
router.put("/:id/comment", addCommentToReview);

// Route to get top-rated reviews for a movie
router.get("/top/:movieId", getTopRatedReviews);

module.exports = router;
