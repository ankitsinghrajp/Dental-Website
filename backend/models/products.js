const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String, // store image path
  category: { type: String, default: 'General' },
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
