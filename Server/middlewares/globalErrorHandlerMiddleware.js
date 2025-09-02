const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }
  console.error(error);
  res
    .status(error.code || 500)
    .json({ errors: [error.message || "Internal Server Error"] });
};

module.exports = errorHandler;
