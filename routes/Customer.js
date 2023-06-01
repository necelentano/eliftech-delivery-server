const express = require("express");

const customerController = require("../controllers/Customer");

const router = express.Router();

router.route("/").post(customerController.createCustomer);

router
  .route("/:id")
  .put(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

module.exports = router;
