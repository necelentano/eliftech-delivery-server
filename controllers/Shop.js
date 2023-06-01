const slugify = require("slugify");

const Shop = require("../models/Shop");
const Product = require("../models/Product");

// @desc Create shop
// @route POST /shops
// @access Public
exports.createShop = async (req, res) => {
  const { name, description, address } = req.body;

  if (!name || !description || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newShop = await Shop.create({
      name,
      description,
      address,
      slug: slugify(name, { lower: true }),
    });

    res.status(201).json(newShop);
  } catch (error) {
    res.status(400).send("Create new shop failed!");
  }
};

// @desc Get shop
// @route GET /shops/:slug
// @access Public
exports.getShop = async (req, res, next) => {
  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ message: "Slug are required" });
  }

  try {
    const shop = await Shop.findOne({ slug }).exec();
    if (!shop) {
      return res.status(400).json({ message: "Shop not found" });
    }
    const products = await Product.find({ shop }).populate("shop");

    res.status(200).json({ shop, products });
  } catch (error) {
    res.status(400).send("Get shop failed!");
  }
};

// @desc Update shop
// @route PUT /shops/:slug
// @access Public
exports.updateShop = async (req, res) => {
  const { name, description, address } = req.body;
  try {
    const updatedShop = await Shop.findOneAndUpdate(
      { slug: req.params.slug },
      { name, description, address, slug: slugify(name, { lower: true }) },
      { new: true }
    );

    res.status(200).json(updatedShop);
  } catch (error) {
    res.status(400).send("Update shop failed!");
  }
};

// @desc Delete shop
// @route DELETE /shops/:slug
// @access Public
exports.deleteShop = async (req, res, next) => {
  try {
    const deletedShop = await Shop.findOneAndDelete({
      slug: req.params.slug,
    });

    res.status(204).json(deletedShop);
  } catch (error) {
    res.status(400).send("Delete shop failed!");
  }
};

// @desc Get all shops
// @route GET /shops
// @access Public
exports.getAllShops = async (req, res) => {
  try {
    const allShops = await Shop.find({}).sort({ createdAt: -1 }).exec();
    res.status(200).json(allShops);
  } catch (error) {
    res.status(400).send("Get all shops failed!");
  }
};
