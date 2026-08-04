const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minLength: 11,
    maxLength: 30,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 200,
    required: true,
    trim: true,
  },
});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
    unique: true,
    trim: true,
  },
  SKU: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    min: 10,
    required: true,
  },
  category: {
    type: String,
    maxLength: 200,
    required: true,
    trim: true,
  },
});

const userModel = mongoose.model("user", userSchema);
const productModel = mongoose.model("product", productSchema);
module.exports = { userModel, productModel };