const resumeService = require("../services/resumeService");
const ResponseError = require("../utils/CustomError");
const path = require("path");

const create = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ResponseError("Resume file is required", 400);
    } else {
      const resume = await resumeService.createResume(
        req.body,
        req.file,
        req.user.id
      );
      res.status(201).json(resume);
    }
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const resumes = await resumeService.getUserResumes(req.user.id);
    const resumesWithUrls = resumes.map((resume) => {
      return {
        _id: resume._id,
        title: resume.title,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
        fileUrl: `${process.env.BASE_URL}${process.env.PORT}/api/protected/resume/${resume._id}/file`,
      };
    });

    res.status(200).json(resumesWithUrls);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const resume = await resumeService.getResumeById(
      req.user.id,
      req.params.id
    );
    if (!resume) {
      throw new ResponseError("Resume Not Found", 404);
    }

    const resumeWithUrl = {
      _id: resume._id,
      title: resume.title,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
      fileUrl: `${process.env.BASE_URL}/api/protected/resume/${resume._id}/file`,
    };

    res.status(200).json(resumeWithUrl);
  } catch (error) {
    next(error);
  }
};

const getFileById = async (req, res, next) => {
  try {
    const resume = await resumeService.getResumeById(
      req.user.id,
      req.params.id
    );
    if (!resume) {
      throw new ResponseError("Resume Not Found", 404);
    }
    const absolutePath = path.join(__dirname, "../", resume.resumeURL);
    console.log(absolutePath);

    //res.send("ok");
    res.status(200).sendFile(absolutePath);
  } catch (error) {
    next(error);
  }
};

const deleteResume = async (req, res, next) => {
  try {
    const deletedResume = await resumeService.deleteResumeById(
      req.user.id,
      req.params.id
    );
    res.status(200).json("Resume Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

const getSummary = async (req, res, next) => {
  try {
    const summary = await resumeService.getResumeSummary(req.user.id);
    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getFileById,
  deleteResume,
  getById,
  getSummary,
};
