const express = require("express");

const productController = require("../controllers/Product");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route("/:slug")
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
