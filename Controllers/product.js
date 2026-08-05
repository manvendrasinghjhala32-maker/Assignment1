const productModel = require("../Models/productModel");
const createProduct = async (req, res) => {
  const { name, SKU, description, price, category } = req.body;
  if (!name || !SKU || !description || !price || !category) {
    return res.json({ message: "all informations are required" });
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
};

const getAllProduct = async (req, res) => {
  try {
    let allProduct = await productModel.find({});
    if (allProduct.length == 0) {
      return res.status(404).json({ message: "no product available" });
    }
    return res.status(200).json({ allProduct });
  } catch (error) {
    return res.status(500).json({ message: "not get any product", error });
  }
};

const getProductById = async (req, res) => {
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
};

const updateProduct = async (req, res) => {
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
};

const deleteProduct = async (req, res) => {
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
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
