const express = require("express");

const orderController = require("../controllers/Order");

const router = express.Router();

router.route("/").post(orderController.createOrder);

router
  .route("/:id")
  .get(orderController.getOneOrder)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

router.route("/customer").post(orderController.getAllOrdersByCustomer);

module.exports = router;
