const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ message: "all fields are required" });
  }
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exist with this email" });
    }
    let hashPassword = await bcrypt.hash(password, 10);

    user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    return res
      .status(201)
      .json({ message: "User successfully registered", user });
  } catch (error) {
    return res.status(500).json({ message: "can't registered User", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "all fields are required" });
  }
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email address" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ name: user.name, email: user.email }, process.env.secret, {
      expiresIn: "5h",
    });
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Login Successfully", user, token });
  } catch (error) {
    return res.status(500).json({ message: "Cannot Login", error });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Cannot Logout", error });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
