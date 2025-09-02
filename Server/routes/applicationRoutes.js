const express = require("express");
const router = express.Router();
const appController = require("../controllers/applicationController");
const {
  validateUserMiddleware,
} = require("../middlewares/validateUserMiddleware");

router.use(validateUserMiddleware);

// --> api/protected/application
router.post("/", appController.create);
router.get("/", appController.getAll);
router.get("/dashboard-summary", appController.summary);
router.get("/recent-activity", appController.recentActivity);
router.get("/:id", appController.getOne);
router.put("/:id", appController.update);
router.delete("/:id", appController.remove);

module.exports = router;
