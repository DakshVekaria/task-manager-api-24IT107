const express = require("express");
const app = express();
const PORT = 3000;

// ── Process-level crash catchers (no emoji - Windows safe) ────
process.on("uncaughtException", (err) => {
  process.stderr.write("[FATAL] Uncaught Exception: " + (err.stack || err.message) + "\n");
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  process.stderr.write("[FATAL] Unhandled Rejection: " + reason + "\n");
  process.exit(1);
});

process.on("exit", (code) => {
  process.stdout.write("[DEBUG] Process exiting with code: " + code + "\n");
});

// ── Import Middleware ─────────────────────────────────────────
const logger       = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// ── Import Routes ─────────────────────────────────────────────
const taskRoutes = require("./routes/taskRoutes");

// ─────────────────────────────────────────────────────────────
// MIDDLEWARE PIPELINE (order matters)
// ─────────────────────────────────────────────────────────────

// 1. Parse incoming JSON request bodies
app.use(express.json());

// 2. Request logger - runs before every route
app.use(logger);

// ─────────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────────

app.use("/tasks", taskRoutes);

// ─────────────────────────────────────────────────────────────
// 404 HANDLER - for any undefined route
// ─────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route " + req.method + " " + req.url + " not found",
  });
});

// ─────────────────────────────────────────────────────────────
// GLOBAL ERROR HANDLER - must be LAST
// ─────────────────────────────────────────────────────────────

app.use(errorHandler);

// ─────────────────────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────────────────────

const server = app.listen(PORT, () => {
  process.stdout.write("Server running on http://localhost:" + PORT + "\n");
});

// Fires if server closes unexpectedly
server.on("close", () => {
  process.stdout.write("[DEBUG] Server closed unexpectedly!\n");
});

// Catch startup errors (e.g. port already in use)
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    process.stderr.write("[ERROR] Port " + PORT + " is already in use.\n");
    process.stderr.write("[ERROR] Run: netstat -ano | findstr :" + PORT + "\n");
  } else {
    process.stderr.write("[ERROR] Server error code: " + err.code + "\n");
    process.stderr.write("[ERROR] Server error message: " + err.message + "\n");
    process.stderr.write("[ERROR] Full error: " + err.stack + "\n");
  }
  process.exit(1);
});
