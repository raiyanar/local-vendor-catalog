const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price is required."],
      min: [0, "price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "image is required."],
    },
    category: {
      type: String,
      required: [true, "category is required."],
      enum: ["Grocery", "Clothing", "Electronics", "Others"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);
