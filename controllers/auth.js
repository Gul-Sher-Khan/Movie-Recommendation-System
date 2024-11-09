const User = require("../models/User");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.generateToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = user.generateToken();

  res.status(200).json({ user, token });
};

module.exports = { register, login };
