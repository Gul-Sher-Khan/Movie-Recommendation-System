const Movie = require("../models/Movie");
const People = require("../models/People");

// Get awards for a specific movie
exports.getAwardsByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ awards: movie.awards || [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get awards for a specific person (Actor, Director, Crew)
exports.getAwardsByPerson = async (req, res) => {
  const { personId } = req.params;

  try {
    const person = await People.findById(personId);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.status(200).json({ awards: person.awards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add awards to a person
exports.addAwardsToPerson = async (req, res) => {
  const { personId } = req.params;
  const { awards } = req.body;

  try {
    const person = await People.findByIdAndUpdate(
      personId,
      { $push: { awards: { $each: awards } } },
      { new: true, runValidators: true }
    );

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.status(200).json({ message: "Awards added successfully", person });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
