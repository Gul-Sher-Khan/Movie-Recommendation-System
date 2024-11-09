const express = require("express");
const router = express.Router();
const {
  getAllPeople,
  getPersonById,
  addPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

router.get("/", getAllPeople).post("/", addPerson);
router.get("/:id", getPersonById).put("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;
