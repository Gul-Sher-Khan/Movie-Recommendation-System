const Movie = require("../models/Movie");
const User = require("../models/User");

exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let moviesByGenre = [];
    let moviesByActors = [];

    // Fetch movies based on favorite genres if available
    if (user.favoriteGenres && user.favoriteGenres.length > 0) {
      moviesByGenre = await Movie.find({ genre: { $in: user.favoriteGenres } });
    }

    // Fetch movies based on favorite actors if available
    if (user.favoriteActors && user.favoriteActors.length > 0) {
      moviesByActors = await Movie.find({ cast: { $in: user.favoriteActors } });
    }

    // Combine and remove duplicates, filtering out nulls
    const uniqueMovies = Array.from(
      new Set([...moviesByGenre, ...moviesByActors].map((movie) => movie?._id))
    )
      .filter((id) => id) // Remove null or undefined IDs
      .map((id) =>
        [...moviesByGenre, ...moviesByActors].find(
          (movie) => movie && movie._id.toString() === id.toString()
        )
      );

    res.status(200).json({ recommendations: uniqueMovies.filter(Boolean) }); // Filter out nulls
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSimilarTitles = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Find similar movies based on genre, director, and popularity
    const similarMovies = await Movie.find({
      _id: { $ne: movieId }, // Exclude the current movie
      $or: [{ genre: movie.genre }, { director: movie.director }],
    }).limit(10);

    res.status(200).json({ similarTitles: similarMovies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTrendingMovies = async (req, res) => {
  try {
    // Trending movies based on recent user activity (e.g., recent views, likes, ratings)
    const trendingMovies = await Movie.find()
      .sort({ createdAt: -1 }) // Recent additions
      .limit(10);

    res.status(200).json({ trendingMovies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopRatedMovies = async (req, res) => {
  try {
    // Top-rated movies based on average rating
    const topRatedMovies = await Movie.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviewsData",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviewsData.rating" },
        },
      },
      { $sort: { averageRating: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({ topRatedMovies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
