const slugify = require("slugify");
const Product = require("../models/Product");

// @desc Create product
// @route POST /products
// @access Public
exports.createProduct = async (req, res) => {
  const { title, description, price, shop, image } = req.body;

  if (!title || !description || !price || !shop || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    req.body.slug = slugify(req.body.title);

    const newProduct = await Product.create(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({
      message: "Create product failed!",
    });
  }
};

// @desc Get all products
// @route GET /products
// @access Public
exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({})
      .populate("shop")
      .sort([["createdAt", "desc"]]);

    res.status(201).json(allProducts);
  } catch (error) {
    res.status(400).json({
      message: "Get all products failed",
    });
  }
};

// @desc Delete product
// @route DELETE /products/:slug
// @access Public
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      slug: req.params.slug,
    });
    res.status(204).json(deletedProduct);
  } catch (error) {
    res.status(400).json({
      message: "Delete product failed",
    });
  }
};

// @desc Get one product
// @route GET /products/:slug
// @access Public
// exports.getOneProduct = async (req, res) => {
//   try {
//     const product = await Product.findOne({
//       slug: req.params.slug,
//     }).populate("shop");

//     res.status(200).json(product);
//   } catch (error) {
//     res.status(400).json({
//       errormessage: error.message,
//     });
//   }
// };

// @desc Update product
// @route PUT /products/:slug
// @access Public
exports.updateProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      req.body,
      {
        new: true,
      }
    ).populate("shop");

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({
      message: "Update product failed!",
    });
  }
};
