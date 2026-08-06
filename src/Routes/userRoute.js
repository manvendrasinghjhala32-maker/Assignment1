const express = require("express");
const router = express.Router();
const validation = require("../Middlewares/checkValidation");
const checkToken = require("../Middlewares/checkToken");
const { registerUser, loginUser, logoutUser } = require("../Controllers/user");
const {
  registerSchema,
  loginSchema,
} = require("../Middlewares/validationSchema");

router.post("/register", validation(registerSchema), registerUser);
router.post("/login", validation(loginSchema), loginUser);
router.get("/logout", checkToken, logoutUser);

module.exports = router;