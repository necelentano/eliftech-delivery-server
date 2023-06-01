const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        quantity: Number, // quantity of one product
      },
    ],
    orderStatus: {
      type: String,
      default: "Successfully ordered!",
    },
    orderedBy: {
      type: ObjectId,
      ref: "Customer",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
