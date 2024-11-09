const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).send("No Token Provided");
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("No Token Provided");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.id,
      role: payload.role,
    };
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).send("Forbidden");
  next();
};

module.exports = { verifyToken, verifyAdmin };
