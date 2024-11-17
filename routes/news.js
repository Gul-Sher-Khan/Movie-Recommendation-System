const express = require("express");
const router = express.Router();
const {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require("../controllers/news");
const { verifyToken, verifyAdmin } = require("../middleware/authentication");

// Create news article
router.post("/", verifyToken, createNews);

// Get all news articles
router.get("/", getAllNews);

// Get a specific news article by ID
router.get("/:id", getNewsById);

// Update news article
router.put("/:id", verifyToken, verifyAdmin, updateNews);

// Delete news article
router.delete("/:id", verifyToken, verifyAdmin, deleteNews);

module.exports = router;
