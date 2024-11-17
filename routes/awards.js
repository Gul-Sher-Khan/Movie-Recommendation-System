const express = require("express");
const router = express.Router();
const {
  getAwardsByMovie,
  getAwardsByPerson,
  addAwardsToPerson,
} = require("../controllers/awards");

// Get awards for a specific movie
router.get("/movie/:movieId", getAwardsByMovie);

// Get awards for a specific person (Actor, Director, Crew)
router.get("/person/:personId", getAwardsByPerson);

// Add awards to a person
router.post("/person/:personId", addAwardsToPerson);

module.exports = router;
