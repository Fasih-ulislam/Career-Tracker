const appService = require("../services/applicationService");
const ResponseError = require("../utils/CustomError");

// Create application
const create = async (req, res, next) => {
  try {
    const newApp = await appService.createApplication(req.user.id, req.body);
    res.status(201).json(newApp);
  } catch (err) {
    next(err);
  }
};

// Get all applications for user
const getAll = async (req, res, next) => {
  try {
    const apps = await appService.getUserApplications(req.user.id);
    res.status(200).json(apps);
  } catch (err) {
    next(err);
  }
};

// Get single application
const getOne = async (req, res, next) => {
  try {
    const app = await appService.getApplicationById(req.user.id, req.params.id);
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.status(200).json(app);
  } catch (err) {
    next(err);
  }
};

// Update application
const update = async (req, res, next) => {
  try {
    const updatedApp = await appService.updateApplication(
      req.user.id,
      req.params.id,
      req.body
    );
    if (!updatedApp)
      return res.status(404).json({ message: "Application not found" });
    res.status(200).json(updatedApp);
  } catch (err) {
    next(err);
  }
};

// Delete application
const remove = async (req, res, next) => {
  try {
    const deletedApp = await appService.deleteApplication(
      req.user.id,
      req.params.id
    );
    if (!deletedApp)
      return res.status(404).json({ message: "Application not found" });
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const summary = async (req, res, next) => {
  try {
    let summary = await appService.getApplicationSummary(req.user.id);
    let resRate = await appService.getApplicationResponseRate(req.user.id);
    res.status(200).json({ ...summary, responseRate: resRate + "%" });
  } catch (error) {
    next(error);
  }
};

const recentActivity = async (req, res, next) => {
  try {
    let activity = await appService.getRecentActivity(req.user.id);
    res.status(200).json(activity);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  summary,
  recentActivity,
};
