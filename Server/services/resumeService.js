const Resume = require("../models/ResumeModel");
const path = require("path");
const deleteFile = require("../utils/DeleteFile");
const ResponseError = require("../utils/CustomError");
const Application = require("../models/ApplicationModel");

const createResume = async (resumeData, resumeFile, userId) => {
  if (!resumeData.title) {
    await deleteFile(resumeFile.path);
  }

  if (await Resume.exists({ title: resumeData.title })) {
    await deleteFile(resumeFile.path);
    throw new ResponseError("Title must be unique", 400);
  }
  return await Resume.create({
    userId,
    title: resumeData.title,
    resumeURL: resumeFile.path,
    fileType: path.extname(resumeFile.originalname),
  });
};

const getResumeSummary = async (userId) => {
  const total = await Resume.countDocuments({ userId });
  let uses = 0;

  if (total) {
    uses = await Application.countDocuments({
      userId,
      resumeUsed: { $exists: true, $ne: null },
    });
  }
  return { total, uses };
};

const deleteResumeById = async (userId, resId) => {
  const deletedFile = await Resume.findOneAndDelete({ userId, _id: resId });
  if (deletedFile) {
    await deleteFile(deletedFile.resumeURL);
    return deletedFile;
  }
  throw new ResponseError("Resume not found", 404);
};

const getUserResumes = async (userId) => {
  return await Resume.find({ userId }).sort({ createdAt: -1 });
};

const getResumeById = async (userId, resumeId) => {
  return await Resume.findOne({ _id: resumeId, userId: userId });
};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  deleteResumeById,
  getResumeSummary,
};
