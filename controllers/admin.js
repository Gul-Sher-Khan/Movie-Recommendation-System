// const Review = require("../models/Review");

// exports.moderateReviews = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const review = await Review.findByIdAndDelete(id);

//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     res.status(200).json({ message: "Review deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const Movie = require("../models/Movie");
// const User = require("../models/User");

// exports.getSiteStatistics = async (req, res) => {
//   try {
//     const mostPopularMovies = await Movie.find()
//       .sort({ popularity: -1 })
//       .limit(5); // Assuming `popularity` field
//     const totalUsers = await User.countDocuments();
//     const totalMovies = await Movie.countDocuments();

//     res.status(200).json({
//       statistics: {
//         mostPopularMovies,
//         totalUsers,
//         totalMovies,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const Movie = require("../models/Movie");

// exports.getTrendingGenres = async (req, res) => {
//   try {
//     const genreCounts = await Movie.aggregate([
//       { $group: { _id: "$genre", count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//     ]);

//     res.status(200).json({ trendingGenres: genreCounts });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const SearchLog = require("../models/SearchLog"); // Assuming you log search activity

// exports.getMostSearchedActors = async (req, res) => {
//   try {
//     const actorSearchCounts = await SearchLog.aggregate([
//       { $match: { type: "actor" } },
//       { $group: { _id: "$query", count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//       { $limit: 10 },
//     ]);

//     res.status(200).json({ mostSearchedActors: actorSearchCounts });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
