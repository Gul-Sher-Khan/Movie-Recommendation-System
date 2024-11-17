const News = require("../models/News");

// Create a news article
exports.createNews = async (req, res) => {
  const { title, content, author, relatedMovies, relatedPeople } = req.body;

  try {
    const news = new News({
      title,
      content,
      author,
      relatedMovies,
      relatedPeople,
    });
    await news.save();

    res
      .status(201)
      .json({ message: "News article created successfully", news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all news articles
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().populate("relatedMovies relatedPeople");
    res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific news article by ID
exports.getNewsById = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findById(id).populate(
      "relatedMovies relatedPeople"
    );

    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }

    res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a news article
exports.updateNews = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }

    res
      .status(200)
      .json({ message: "News article updated successfully", news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a news article
exports.deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }

    res.status(200).json({ message: "News article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
