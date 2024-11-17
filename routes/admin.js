// const express = require("express");
// const router = express.Router();
// const {
//   manageMovies,
//   moderateReviews,
//   getSiteStatistics,
//   getTrendingGenres,
//   getMostSearchedActors,
//   getUserEngagementPatterns,
// } = require("../controllers/admin");
// const { verifyAdmin } = require("../middleware/authentication");

// // Admin: Moderate Reviews
// router.delete("/reviews/:id", verifyAdmin, moderateReviews);

// // Admin: View Site Statistics
// router.get("/statistics", verifyAdmin, getSiteStatistics);

// // Admin: Trending Genres
// router.get("/trending-genres", verifyAdmin, getTrendingGenres);

// // Admin: Most Searched Actors
// router.get("/most-searched-actors", verifyAdmin, getMostSearchedActors);

// // Admin: User Engagement Patterns
// router.get("/engagement-patterns", verifyAdmin, getUserEngagementPatterns);

// module.exports = router;
