require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth"); // Import auth router

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/test", (req, res) => {
  res.send("Test route working");
});

// Middleware for /api/v1/auth routes
app.use(
  "/api/v1/auth",
  (req, res, next) => {
    console.log("Middleware executed");
    next();
  },
  authRouter
);

// Catch-all for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
