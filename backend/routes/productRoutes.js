const express = require("express");
const multer = require("multer");
const Product = require("../models/products.js");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Setup Multer (file upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Add Product
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category, tags } = req.body;
    const image = req.file ? req.file.path : null;

    // Parse tags if it's a JSON string
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = JSON.parse(tags);
      } catch (e) {
        parsedTags = Array.isArray(tags) ? tags : [tags];
      }
    }

    const product = await Product.create({ 
      name, 
      description, 
      price, 
      image, 
      category: category || 'General',
      tags: parsedTags
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
