const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const registerUserService = async ({ name, email, password }) => {
  let user = await userModel.findOne({ email });
  if (user) {
    const error = new Error("User already exist with this email");
    error.statusCode = 409;
    throw error;
  }
  let hashPassword = await bcrypt.hash(password, process.env.salt);

  user = await userModel.create({
    name,
    email,
    password: hashPassword,
  });
  return user;
};

const loginUserService = async ({ email, password }) => {
  let user = await userModel.findOne({ email });
  if (!user) {
    const error = new Error("User not found with this email address");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid Credentials");
    error.statusCode = 401;
    throw error;
  }
  const token = jwt.sign(
    { name: user.name, email: user.email },
    process.env.secret,
    {
      expiresIn: "5h",
    },
  );
  return { user, token };
};

module.exports = { registerUserService, loginUserService };