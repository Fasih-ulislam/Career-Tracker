const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const encrypter = require("bcryptjs");

const registerUser = async (req, res, next) => {
  try {
    await userService.saveUser(req.body);
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ errors: ["Email and password are required."] });
    }

    // Getting user from service
    const user = await userService.findUserByEmail(email);

    // Compare password
    const isMatch = await encrypter.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: ["Invalid Email or Password"] });
    }

    // Main token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // 1 h
      }
    );

    //Main cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, //only over HTTPS
      sameSite: "None",
      maxAge: 60 * 60 * 1000, //1 h
    });

    res.status(200).json("Login successfull");
  } catch (error) {
    next(error);
  }
};

const validateUser = (req, res, next) => {
  return res.status(200).json({ message: "user valid", user: req.user });
};

const logoutUser = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json("Logout Successfull");
};

module.exports = {
  registerUser,
  loginUser,
  validateUser,
  logoutUser,
};
