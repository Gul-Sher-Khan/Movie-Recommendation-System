const People = require("../models/People");

// Get all people
const getAllPeople = async (req, res) => {
  try {
    const people = await People.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single person by ID
const getPersonById = async (req, res) => {
  try {
    const person = await People.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new person
const addPerson = async (req, res) => {
  try {
    const person = await People.create(req.body);
    res.status(201).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a person by ID
const updatePerson = async (req, res) => {
  try {
    const person = await People.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a person by ID
const deletePerson = async (req, res) => {
  try {
    const person = await People.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPeople,
  getPersonById,
  addPerson,
  updatePerson,
  deletePerson,
};
