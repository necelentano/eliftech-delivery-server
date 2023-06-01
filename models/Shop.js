const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      requred: true,
      minLength: [2, "Shop name is too short"],
      maxLength: [32, "Shop name is too long"],
    },
    description: {
      type: String,
      trim: true,
      requred: true,
      minLength: [10, "Shop description is too short"],
      maxLength: [132, "Shop description is too long"],
    },
    address: {
      type: String,
      trim: true,
      requred: true,
      minLength: [10, "Shop address is too short"],
      maxLength: [222, "Shop address is too long"],
    },
    slug: { type: String, unique: true, lowercase: true, index: true },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
