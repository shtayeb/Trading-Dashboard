const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    size: {
      type: Array,
    },
    color: {
      type: Array,
    },
    categories: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
