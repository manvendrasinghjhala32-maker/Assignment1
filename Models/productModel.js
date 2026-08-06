const mongoose = require("mongoose");

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

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;