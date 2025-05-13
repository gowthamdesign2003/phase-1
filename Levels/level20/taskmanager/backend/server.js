// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect("mongodb://localhost:27017/taskmanager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/auth", require("./routes/auth"));

// Basic route for health check
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
