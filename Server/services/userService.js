const User = require("../models/UserModel");
const encrypter = require("bcryptjs");
const saltRounds = 10;
const ResponseError = require("../utils/CustomError");

const saveUser = async (userData) => {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    throw new ResponseError("Required fields not filled", 400);
  } else if (await User.exists({ email: email })) {
    throw new ResponseError("Email already exists", 400);
  }

  const hashedpassword = await encrypter.hash(password, saltRounds);

  const user = new User({ name, email, password: hashedpassword });

  await user.save();
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    throw new ResponseError("Invalid Email or Password", 400);
  }
  return user;
};

module.exports = { saveUser, findUserByEmail };
