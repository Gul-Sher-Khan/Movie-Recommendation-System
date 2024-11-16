const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");
const { verifyAdmin } = require("../middleware/authentication");

// Route to get all movies and add a new movie
router.route("/").get(getAllMovies).post(verifyAdmin, addMovie);

// Route to get, update, and delete a movie by ID
router
  .route("/:id")
  .get(getMovieById)
  .put(verifyAdmin, updateMovie)
  .delete(verifyAdmin, deleteMovie);

module.exports = router;
