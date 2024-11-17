const Movie = require("../models/Movie");

exports.searchMovies = async (req, res) => {
  const { title, genre, director, actor } = req.query;

  try {
    const query = {};

    // Build search criteria
    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }
    if (genre) {
      query.genre = genre;
    }
    if (director) {
      query.director = director; // Must be an ObjectId
    }
    if (actor) {
      query.cast = actor; // Must be an ObjectId
    }

    const movies = await Movie.find(query).populate("director cast reviews");

    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterMovies = async (req, res) => {
  const { minRating, maxRating, popularity, releaseYear } = req.query;

  try {
    const query = {};

    // Filter by ratings
    if (minRating || maxRating) {
      query["reviews.rating"] = {};
      if (minRating) query["reviews.rating"].$gte = parseFloat(minRating);
      if (maxRating) query["reviews.rating"].$lte = parseFloat(maxRating);
    }

    // Filter by popularity
    if (popularity) {
      query.popularity = { $gte: parseInt(popularity) }; // Assuming a `popularity` field exists
    }

    // Filter by release year
    if (releaseYear) {
      query.releaseDate = {
        $gte: new Date(`${releaseYear}-01-01`),
        $lte: new Date(`${releaseYear}-12-31`),
      };
    }

    const movies = await Movie.find(query).populate("director cast reviews");

    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.advancedFilterMovies = async (req, res) => {
  const { decade, country, language, keyword } = req.query;

  try {
    const query = {};

    // Filter by release decade
    if (decade) {
      const startYear = parseInt(decade);
      const endYear = startYear + 9;
      query.releaseDate = {
        $gte: new Date(`${startYear}-01-01`),
        $lte: new Date(`${endYear}-12-31`),
      };
    }

    // Filter by country
    if (country) {
      query.country = country;
    }

    // Filter by language
    if (language) {
      query.language = language;
    }

    // Filter by keyword
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" }; // Case-insensitive search
    }

    const movies = await Movie.find(query).populate("director cast reviews");

    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopMovieLists = async (req, res) => {
  const { type, genre } = req.query;

  try {
    let movies;

    if (type === "month") {
      // Get top movies of the month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);

      movies = await Movie.find({
        createdAt: { $gte: startOfMonth },
      })
        .sort({ popularity: -1 }) // Assuming a `popularity` field exists
        .limit(10);
    } else if (type === "top10" && genre) {
      // Get top 10 movies by genre
      movies = await Movie.find({ genre })
        .sort({ "reviews.rating": -1 }) // Sort by highest rating
        .limit(10);
    } else {
      return res
        .status(400)
        .json({ message: "Invalid type or genre parameter" });
    }

    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
