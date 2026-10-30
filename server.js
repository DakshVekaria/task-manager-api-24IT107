require('dotenv').config();
const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
require('./middleware/listner');

const cors = require("cors");
app.use(cors());

app.use(express.json());

// Simple route with no DB or login, used by the CI test
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.use("/tasks", require("./routes/taskRoutes"));
app.use(require("./routes/auth"));

app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.use(require("./middleware/errorHandler"));

// Runs only with `node server.js`, NOT when a test imports this file
if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

  app.listen(PORT, () => console.log("Server running at " + PORT));
}

module.exports = app;