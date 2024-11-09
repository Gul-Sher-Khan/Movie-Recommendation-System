const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  content: {
    type: String,
    required: [true, "Please provide content"],
  },
  author: {
    type: String,
    required: [true, "Please provide an author"],
  },
  relatedMovies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Movie",
    default: [],
  },
  relatedPeople: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "People",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
