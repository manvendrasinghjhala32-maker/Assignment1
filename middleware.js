const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.secret;
const checkToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const user = jwt.verify(token, secret);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = checkToken;