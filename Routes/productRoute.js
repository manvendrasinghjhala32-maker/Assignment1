const express = require("express");
const router = express.Router();
const validation = require("../Middlewares/checkValidation");
const checkToken = require("../Middlewares/checkToken");
const { productSchema, updateProductSchema } = require("../Middlewares/validationSchema");

const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../Controllers/product");

router.post(
  "/createproduct",
  validation(productSchema),
  checkToken,
  createProduct,
);

router.get("/getallproduct", getAllProduct);
router.get("/getproductbyid/:id", getProductById);
router.patch("/updateproductbyid/:id", checkToken, validation(updateProductSchema), updateProduct);
router.delete("/deleteproduct/:id", checkToken, deleteProduct);

module.exports = router;
