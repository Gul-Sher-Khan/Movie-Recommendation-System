const CustomList = require("../models/CustomList");

exports.createCustomList = async (req, res) => {
  const { listName, movies } = req.body;

  try {
    const customList = new CustomList({
      listName,
      movies: movies || [],
      user: req.user.id,
    });

    await customList.save();

    res
      .status(201)
      .json({ message: "Custom list created successfully", customList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserCustomLists = async (req, res) => {
  try {
    const customLists = await CustomList.find({ user: req.user.id }).populate(
      "movies"
    );

    res.status(200).json({ customLists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addMoviesToCustomList = async (req, res) => {
  const { listId } = req.params;
  const { movies } = req.body;

  try {
    const customList = await CustomList.findByIdAndUpdate(
      listId,
      { $addToSet: { movies: { $each: movies } } }, // Add unique movies
      { new: true }
    ).populate("movies");

    if (!customList) {
      return res.status(404).json({ message: "Custom list not found" });
    }

    res.status(200).json({ message: "Movies added successfully", customList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeMoviesFromCustomList = async (req, res) => {
  const { listId } = req.params;
  const { movies } = req.body;

  try {
    const customList = await CustomList.findByIdAndUpdate(
      listId,
      { $pull: { movies: { $in: movies } } }, // Remove movies
      { new: true }
    ).populate("movies");

    if (!customList) {
      return res.status(404).json({ message: "Custom list not found" });
    }

    res
      .status(200)
      .json({ message: "Movies removed successfully", customList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCustomList = async (req, res) => {
  const { listId } = req.params;

  try {
    const customList = await CustomList.findByIdAndDelete(listId);

    if (!customList) {
      return res.status(404).json({ message: "Custom list not found" });
    }

    res.status(200).json({ message: "Custom list deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.shareCustomList = async (req, res) => {
  const { listId } = req.params;

  try {
    const customList = await CustomList.findById(listId).populate("movies");

    if (!customList) {
      return res.status(404).json({ message: "Custom list not found" });
    }

    // Generate a shareable object (e.g., a link or JSON response)
    const sharedList = {
      listName: customList.listName,
      movies: customList.movies,
      createdBy: req.user.name,
    };

    res
      .status(200)
      .json({ message: "Custom list shared successfully", sharedList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.saveSharedList = async (req, res) => {
  const { listId } = req.params;

  try {
    const originalList = await CustomList.findById(listId);

    if (!originalList) {
      return res
        .status(404)
        .json({ message: "Original custom list not found" });
    }

    const savedList = new CustomList({
      listName: `${originalList.listName} (Copy)`,
      movies: originalList.movies,
      user: req.user.id,
    });

    await savedList.save();

    res
      .status(201)
      .json({ message: "Custom list saved successfully", savedList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
