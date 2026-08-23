const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
require('dotenv').config();

const cors = require("cors");
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use("/tasks", require("./routes/taskRoutes"));
app.use(require("./routes/auth"));

app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.use(require("./middleware/errorHandler"));

app.listen(PORT, () => console.log("Server running at "+PORT));