const Forum = require("../models/Forum");
const Post = require("../models/Post");

// Create a forum
exports.createForum = async (req, res) => {
  const { title, description } = req.body;

  try {
    const forum = new Forum({ title, description });
    await forum.save();

    res.status(201).json({ message: "Forum created successfully", forum });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all forums
exports.getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find();
    res.status(200).json({ forums });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific forum by ID
exports.getForumById = async (req, res) => {
  const { id } = req.params;

  try {
    const forum = await Forum.findById(id).populate("posts");

    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    res.status(200).json({ forum });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a post in a forum
exports.createPost = async (req, res) => {
  const { id } = req.params;
  const { title, content, user } = req.body;

  try {
    const forum = await Forum.findById(id);

    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    const post = new Post({ title, content, user, forum: id });
    await post.save();

    forum.posts.push(post._id);
    await forum.save();

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a forum
exports.deleteForum = async (req, res) => {
  const { id } = req.params;

  try {
    const forum = await Forum.findByIdAndDelete(id);

    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    res.status(200).json({ message: "Forum deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
