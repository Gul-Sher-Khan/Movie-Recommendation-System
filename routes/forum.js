const express = require("express");
const router = express.Router();
const {
  createForum,
  getAllForums,
  getForumById,
  createPost,
  deleteForum,
} = require("../controllers/forum");

// Create a forum
router.post("/", createForum);

// Get all forums
router.get("/", getAllForums);

// Get a specific forum by ID (with posts)
router.get("/:id", getForumById);

// Add a post to a forum
router.post("/:id/posts", createPost);

// Delete a forum
router.delete("/:id", deleteForum);

module.exports = router;
