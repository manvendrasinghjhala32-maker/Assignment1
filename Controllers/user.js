const {
  registerUserService,
  loginUserService,
} = require("../Services/userService");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ message: "all fields are required" });
  }
  try {
    const user = await registerUserService({ name, email, password });
    return res
      .status(201)
      .json({ message: "User Successfully registered", user });
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
    const { user, token } = await loginUserService({ email, password });
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