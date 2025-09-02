const Application = require("../models/ApplicationModel");

// Create new application
const createApplication = async (userId, data) => {
  return await Application.create({ ...data, userId });
};

// Get all applications of a user
const getUserApplications = async (userId) => {
  return await Application.find({ userId }).sort({ createdAt: -1 }).lean();
};

// Get single application by ID
const getApplicationById = async (userId, appId) => {
  return await Application.findOne({ _id: appId, userId: userId }).lean();
};

// Update application
const updateApplication = async (userId, appId, updates) => {
  return await Application.findOneAndUpdate({ _id: appId, userId }, updates, {
    new: true,
    runValidators: true,
  }).lean();
};

// Delete application
const deleteApplication = async (userId, appId) => {
  return await Application.findOneAndDelete({ _id: appId, userId });
};

// get all applications summary
const getApplicationSummary = async (userId) => {
  const total = await Application.countDocuments({ userId });
  let active = 0;
  let interview = 0;
  let offers = 0;
  let rejected = 0;
  let pending = 0;

  if (total) {
    active = await Application.countDocuments({
      userId,
      applicationStatus: { $nin: ["Offer Received", "Rejected", "Withdrawn"] },
    });
    interview = await Application.countDocuments({
      userId,
      applicationStatus: {
        $in: ["Phone Interview", "Final Interview", "Technical Interview"],
      },
    });
    offers = await Application.countDocuments({
      userId,
      applicationStatus: "Offer Received",
    });
    rejected = await Application.countDocuments({
      userId,
      applicationStatus: "Rejected",
    });
    pending = await Application.countDocuments({
      userId,
      applicationStatus: {
        $in: ["Applied", "Under review"],
      },
    });
  }
  return { total, active, interview, offers, rejected, pending };
};

//get applications response rate
const getApplicationResponseRate = async (userId) => {
  let responseRate = 0;
  const total = await Application.countDocuments({ userId });
  if (total) {
    let responded = await Application.countDocuments({
      userId,
      applicationStatus: { $nin: ["Applied", "Under Review", "Withdrawn"] },
    });
    responseRate = Math.round((responded / total) * 100);
    console.log(responseRate);
  }
  return responseRate;
};

//get last 3 application updates
const getRecentActivity = async (userId) => {
  const activity = await Application.find({ userId })
    .sort({ updatedAt: -1 })
    .limit(3)
    .select("applicationStatus companyName positionTitle updatedAt");
  return activity;
};

module.exports = {
  createApplication,
  getUserApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationSummary,
  getApplicationResponseRate,
  getRecentActivity,
};
