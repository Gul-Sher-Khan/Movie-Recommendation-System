const express = require("express");
const router = express.Router();
const {
  createBoxOffice,
  getBoxOfficeByMovie,
  updateBoxOffice,
  deleteBoxOffice,
} = require("../controllers/boxOffice");

// Create Box Office record for a movie
router.post("/", createBoxOffice);

// Get Box Office information for a specific movie
router.get("/:movieId", getBoxOfficeByMovie);

// Update Box Office information
router.put("/:movieId", updateBoxOffice);

// Delete Box Office record
router.delete("/:movieId", deleteBoxOffice);

module.exports = router;
