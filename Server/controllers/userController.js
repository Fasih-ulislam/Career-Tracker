const userService = require("../services/userService");

const getUserInfo = async (req, res, next) => {
  try {
    let user = await userService.findUserByEmail(req.user.email);
    res.status(200).json({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserInfo,
};
