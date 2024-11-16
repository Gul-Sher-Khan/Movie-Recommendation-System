const express = require("express");
const router = express.Router();
const {
  createCustomList,
  getUserCustomLists,
  addMoviesToCustomList,
  removeMoviesFromCustomList,
  deleteCustomList,
  shareCustomList,
  saveSharedList,
} = require("../controllers/customLists");

// Create a new custom list
router.post("/", createCustomList);

// Get all custom lists of the logged-in user
router.get("/", getUserCustomLists);

// Add movies to a custom list
router.put("/:listId/add", addMoviesToCustomList);

// Remove movies from a custom list
router.put("/:listId/remove", removeMoviesFromCustomList);

// Delete a custom list
router.delete("/:listId", deleteCustomList);

// Share a custom list with others
router.post("/:listId/share", shareCustomList);

// Save a shared custom list
router.post("/:listId/save", saveSharedList);

module.exports = router;
