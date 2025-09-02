const express = require("express");
const router = express.Router();
const {
  validateUserMiddleware,
} = require("../middlewares/validateUserMiddleware");
const uploadResume = require("../middlewares/uploadResume");
//controllers
const {
  create,
  getAll,
  deleteResume,
  getById,
  getFileById,
  getSummary,
} = require("../controllers/resumeController");
const ResponseError = require("../utils/CustomError");

// ---> api/protected/resume
router.use(validateUserMiddleware);
router.post("/", uploadResume.single("resume"), create);
router.get("/dashboard-summary", getSummary);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", deleteResume);
router.get("/:id/file", getFileById);

module.exports = router;
