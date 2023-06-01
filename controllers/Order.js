const Order = require("../models/Order");
const Customer = require("../models/Customer");

// @desc Create order
// @route POST /orders
// @access Public
exports.createOrder = async (req, res) => {
  const { products, orderedBy } = req.body;

  if (!products || !orderedBy) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newOrder = await Order.create({
      products,
      orderedBy,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Create new order failed!" });
  }
};

// @desc Get one order by ID
// @route GET /orders/:id
// @access Public
exports.getOneOrder = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID are required" });
  }

  try {
    const order = await Order.findById(id).exec();

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: "Get shop failed!" });
  }
};

// @desc Update order
// @route PUT /orders/:id
// @access Public
exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID are required" });
  }

  const { products, orderedBy } = req.body;

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { id },
      { products, orderedBy },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: "Update order failed!" });
  }
};

// @desc Delete order
// @route DELETE /orders/:id
// @access Public
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID are required" });
  }
  try {
    const deletedOrder = await Order.findOneAndDelete({ id });

    res.status(204).json(deletedOrder);
  } catch (error) {
    res.status(400).json({ message: "Delete order failed!" });
  }
};

// @desc Get all orders by customer
// @route POST /orders/customer
// @access Public
exports.getAllOrdersByCustomer = async (req, res) => {
  const { email, phone } = req.body;

  if (!email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const customer = await Customer.find({ email, phone });

    if (!customer) {
      return res
        .status(400)
        .json({ message: "Invalid customer data received" });
    }

    const allOrders = await Order.find({
      orderedBy: customer[0]._id,
    }).populate("products.product");

    res.status(201).json(allOrders);
  } catch (error) {
    res.status(400).json({
      message: "Get all orders by customer failed",
    });
  }
};
