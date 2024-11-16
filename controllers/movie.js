const Movie = require("../models/Movie");
const Review = require("../models/Review");
const People = require("../models/People");

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate("director cast reviews");
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate(
      "director cast reviews"
    );
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new movie
exports.addMovie = async (req, res) => {
  const {
    title,
    genre,
    country,
    language,
    director,
    cast,
    releaseDate,
    ageRating,
  } = req.body;

  try {
    const movie = new Movie({
      title,
      genre,
      country,
      language,
      director,
      cast,
      releaseDate,
      ageRating,
    });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a movie by ID
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
