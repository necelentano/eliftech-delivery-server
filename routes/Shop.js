const express = require("express");

// controllers
const shopController = require("../controllers/Shop");

const router = express.Router();

router
  .route("/")
  .get(shopController.getAllShops)
  .post(shopController.createShop);

router
  .route("/:slug")
  .get(shopController.getShop)
  .put(shopController.updateShop)
  .delete(shopController.deleteShop);

module.exports = router;
