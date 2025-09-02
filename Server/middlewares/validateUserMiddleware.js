const jwt = require("jsonwebtoken");

const validateUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ errors: ["Unauthorized: Missing token"] });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ errors: ["Token expired"] });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ errors: ["Invalid token"] });
    } else {
      return res.status(401).json({ errors: ["Unauthorized"] });
    }
  }
};

module.exports = {
  validateUserMiddleware,
};
