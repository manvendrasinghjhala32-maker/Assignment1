const productModel = require("../Models/productModel");

const createProductService = async ({
  name,
  SKU,
  description,
  price,
  category,
}) => {
  let product = await productModel.findOne({ SKU });
  if (product) {
    const error = new Error("Product alrerady exist");
    error.statusCode = 409;
    throw error;
  }
  product = await productModel.create({
    name,
    SKU,
    description,
    price,
    category,
  });
  return product;
};

const getAllProductService = async () => {
  let allProduct = await productModel.find({});
  if (allProduct.length == 0) {
    const error = new Error("No Product available");
    error.statusCode = 404;
    throw error;
  }
  return allProduct;
};

const getProductByIdService = async (id) => {
  let product = await productModel.findById(id);
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  return product;
};

const updateProductService = async (id, body) => {
  let product = await productModel.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  return product;
};

const deleteProductService = async (id) => {
  let product = await productModel.findByIdAndDelete(id);
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  return product;
};

module.exports = {
  createProductService,
  getAllProductService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};