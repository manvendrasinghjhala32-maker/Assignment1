const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const express = require("express");
const app = express();
const { userModel, productModel } = require("./userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const secret = process.env.secret;
const cookieParser = require("cookie-parser");
const checkToken = require("./middleware");
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT;
const url = process.env.url;

mongoose
  .connect(url)
  .then((e) => console.log("Mongo DB connected"))
  .catch((e) => console.log("Failed to connect with database"));

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ message: "all fields are required" });
  }
  try {
    const registerSchema = joi.object({
      name: joi.string().min(2).max(30).required(),
      email: joi.string().min(11).max(30).email().required(),
      password: joi.string().min(8).max(200).required(),
    });
    const { error } = registerSchema.validate({ name, email, password });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

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
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "all fields are required" });
  }
  try {
    const loginSchema = joi.object({
      email: joi.string().min(11).max(30).email().required(),
      password: joi.string().min(8).max(200).required(),
    });
    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

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
    const token = jwt.sign({ name: user.name, email: user.email }, secret, {
      expiresIn: "5h",
    });
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Login Successfully", user, token });
  } catch (error) {
    return res.status(500).json({ message: "Cannot Login", error });
  }
});

app.get("/logout", checkToken, (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Cannot Logout", error });
  }
});

app.post("/createproduct", checkToken, async (req, res) => {
  const { name, SKU, description, price, category } = req.body;
  if (!name || !SKU || !description || !price || !category) {
    return res.json({ message: "all informations are required" });
  }
  const productSchema = joi.object({
    name: joi.string().min(2).max(30).required(),
    SKU: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().min(10).required(),
    category: joi.string().max(200).required(),
  });
  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    let product = await productModel.create({
      name,
      SKU,
      description,
      price,
      category,
    });
    return res
      .status(201)
      .json({ message: "Product successfully created", product });
  } catch (error) {
    return res.status(500).json({ message: "cannot create product", error });
  }
});

app.get("/getallproduct", async (req, res) => {
  try {
    let allProduct = await productModel.find({});
    if (allProduct.length == 0) {
      return res.status(404).json({ message: "no product available" });
    }
    return res.status(200).json({ allProduct });
  } catch (error) {
    return res.status(500).json({ message: "not get any product", error });
  }
});

app.get("/getproductbyid/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: "Cannot get product" });
  }
});

app.patch("/updateproductbyid/:id", checkToken, async (req, res) => {
  let id = req.params.id;
  try {
    let product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({ message: "After update", product });
  } catch (error) {
    return res.status(500).json({ message: "Cannot update", error });
  }
});

app.delete("/deleteproduct/:id", checkToken, async (req, res) => {
  let id = req.params.id;
  try {
    let product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "no product found" });
    }
    return res.status(200).json({ message: "Deleted successfully", product });
  } catch (error) {
    return res.status(500).json({ message: "cannot delete", error });
  }
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));