const express = require("express");
const router = express.Router();
const {
  searchMovies,
  filterMovies,
  advancedFilterMovies,
  getTopMovieLists,
} = require("../controllers/search");

// Search movies by title, genre, director, or actors
router.get("/", searchMovies);

// Filter movies by ratings, popularity, and release year
router.get("/filter", filterMovies);

// Advanced filtering options (release decade, country, language, keywords)
router.get("/advanced-filter", advancedFilterMovies);

// Get top movie lists
router.get("/top-movies", getTopMovieLists);

module.exports = router;
