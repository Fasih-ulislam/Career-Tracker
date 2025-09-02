const express = require("express");
const router = express.Router();
//middleware for auth
const {
  validateUserMiddleware,
} = require("../middlewares/validateUserMiddleware");
//controller
const userController = require("../controllers/UserController");

router.use(validateUserMiddleware);

router.get("/my-info", userController.getUserInfo);

module.exports = router;
