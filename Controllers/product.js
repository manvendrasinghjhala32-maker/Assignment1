const {
  createProductService,
  getAllProductService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} = require("../Services/productService");

const createProduct = async (req, res) => {
  const { name, SKU, description, price, category } = req.body;
  if (!name || !SKU || !description || !price || !category) {
    return res.json({ message: "all informations are required" });
  }
  try {
    const product = createProductService({
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
    const allProduct = getAllProductService();
    return res.status(200).json({ allProduct });
  } catch (error) {
    return res.status(500).json({ message: "not get any product", error });
  }
};

const getProductById = async (req, res) => {
  let id = req.params.id;
  try {
    const product = getProductByIdService(id);
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: "Cannot get product" });
  }
};

const updateProduct = async (req, res) => {
  let id = req.params.id;
  try {
    const product = updateProductService(id, req.body);
    return res.status(200).json({ message: "After update", product });
  } catch (error) {
    return res.status(500).json({ message: "Cannot update", error });
  }
};

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  try {
    let product = deleteProductService(id);
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