const Customer = require("../models/Customer");
const Order = require("../models/Order");
const axios = require("axios");

//recaptcha human validation
const validateHuman = async (recapchaToken) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recapchaToken}`
    );

    return response.data.success;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// @desc Create new customer
// @route POST /customer
// @access Public
exports.createCustomer = async (req, res) => {
  const { email, phone, name, address } = req.body.form;
  const { recaptchaToken } = req.body;

  const human = await validateHuman(recaptchaToken);

  if (!human) {
    return res.status(400).json({ message: "Bad Robot. Go away!" });
  }

  if (!email || !phone || !name || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if customer already exist (by email)
    const customer = await Customer.findOne({ email });

    if (!customer) {
      const newCustomer = await Customer.create({
        email,
        phone,
      });

      return res.status(201).json(newCustomer);
    }

    // if existed customer change phone, address or name
    if (
      customer.phone !== phone ||
      customer.address !== address ||
      customer.name !== name
    ) {
      const updatedCustomer = await Customer.findOneAndUpdate(
        { email },
        { phone, name, address },
        { new: true }
      );

      return res.status(200).json(updatedCustomer);
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: "Create new customer failed!" });
  }
};

// @desc Update customer
// @route PUT /customer
// @access Public
exports.updateCustomer = async (req, res) => {
  const { email, phone } = req.body;

  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      { email, phone },
      { new: true }
    );

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: "Update customer failed!" });
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({
      _id: req.params.id,
    });

    res.status(204).json(deletedCustomer);
  } catch (error) {
    res.status(400).json({ message: "Delete customer failed!" });
  }
};
