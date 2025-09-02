const express = require("express");
const router = express.Router();
const {
  validateUserMiddleware,
} = require("../middlewares/validateUserMiddleware");
//controllers
const {
  registerUser,
  loginUser,
  validateUser,
  logoutUser,
  getUserInfo,
} = require("../controllers/authController");

// ---> api/auth/
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/validate", validateUserMiddleware, validateUser);
router.get("/logout", logoutUser);

module.exports = router;
