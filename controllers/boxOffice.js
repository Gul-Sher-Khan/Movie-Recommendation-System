const BoxOffice = require("../models/BoxOffice");

// Create Box Office record for a movie
exports.createBoxOffice = async (req, res) => {
  const { movie, openingWeekendEarnings, totalEarnings, internationalRevenue } =
    req.body;

  try {
    const boxOffice = new BoxOffice({
      movie,
      openingWeekendEarnings,
      totalEarnings,
      internationalRevenue,
    });

    await boxOffice.save();

    res
      .status(201)
      .json({ message: "Box Office record created successfully", boxOffice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Box Office information for a specific movie
exports.getBoxOfficeByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const boxOffice = await BoxOffice.findOne({ movie: movieId }).populate(
      "movie"
    );

    if (!boxOffice) {
      return res.status(404).json({ message: "Box Office record not found" });
    }

    res.status(200).json({ boxOffice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Box Office information
exports.updateBoxOffice = async (req, res) => {
  const { movieId } = req.params;
  const { openingWeekendEarnings, totalEarnings, internationalRevenue } =
    req.body;

  try {
    const boxOffice = await BoxOffice.findOneAndUpdate(
      { movie: movieId },
      { openingWeekendEarnings, totalEarnings, internationalRevenue },
      { new: true, runValidators: true }
    );

    if (!boxOffice) {
      return res.status(404).json({ message: "Box Office record not found" });
    }

    res
      .status(200)
      .json({ message: "Box Office record updated successfully", boxOffice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Box Office record
exports.deleteBoxOffice = async (req, res) => {
  const { movieId } = req.params;

  try {
    const boxOffice = await BoxOffice.findOneAndDelete({ movie: movieId });

    if (!boxOffice) {
      return res.status(404).json({ message: "Box Office record not found" });
    }

    res.status(200).json({ message: "Box Office record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
