const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  genre: {
    type: String,
    required: [true, "Please provide a genre"],
  },
  country: {
    type: String,
    required: [true, "Please provide a country"],
  },
  language: {
    type: String,
    required: [true, "Please provide a language"],
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "People",
    required: [true, "Please provide a director"],
  },
  cast: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "People",
    default: [],
  },
  releaseDate: {
    type: Date,
    required: [true, "Please provide a release date"],
  },
  ageRating: {
    type: Number,
    required: [true, "Please provide an age rating"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Review",
    default: [],
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
