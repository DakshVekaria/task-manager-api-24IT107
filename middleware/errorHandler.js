// Middleware: Global Error Handler
// Must be registered LAST in the Express middleware pipeline.
// Express identifies this as an error handler via the 4-parameter signature.

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
};

module.exports = errorHandler;
