const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const ResponseError = require("../utils/CustomError");

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

const validateSocket = async (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.token;
    if (!token) throw new ResponseError("Authentication via token failed", 401);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateUserMiddleware,
  validateSocket,
};
