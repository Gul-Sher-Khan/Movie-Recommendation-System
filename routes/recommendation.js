const express = require("express");
const router = express.Router();
const {
  getRecommendations,
  getSimilarTitles,
  getTrendingMovies,
  getTopRatedMovies,
} = require("../controllers/recommendation");

// Get personalized recommendations for a user
router.get("/personalized", getRecommendations);

// Get similar titles for a movie
router.get("/similar/:movieId", getSimilarTitles);

// Get trending movies
router.get("/trending", getTrendingMovies);

// Get top-rated movies
router.get("/top-rated", getTopRatedMovies);

module.exports = router;
