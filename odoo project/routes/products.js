const express = require("express");
const { check, validationResult } = require("express-validator");
const Product = require("../models/Product");
const { auth, seller } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      subcategory,
      brand,
      condition,
      size,
      color,
      minPrice,
      maxPrice,
      search,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const query = { status: "available" };

    // Apply filters
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (brand) query.brand = { $regex: brand, $options: "i" };
    if (condition) query.condition = condition;
    if (size) query.size = size;
    if (color) query.color = { $regex: color, $options: "i" };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const sortOptions = {};
    sortOptions[sort] = order === "desc" ? -1 : 1;

    const products = await Product.find(query)
      .populate("seller", "name")
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   POST /api/products
// @desc    Create a product
// @access  Private (Seller)
router.post(
  "/",
  [
    auth,
    seller,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("brand", "Brand is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
      check("subcategory", "Subcategory is required").not().isEmpty(),
      check("condition", "Condition is required").not().isEmpty(),
      check("size", "Size is required").not().isEmpty(),
      check("color", "Color is required").not().isEmpty(),
      check("price", "Price is required").isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newProduct = new Product({
        ...req.body,
        seller: req.user.id,
      });

      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private (Seller)
router.put("/:id", auth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Make sure user owns product or is admin
    if (
      product.seller.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "User not authorized" });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Seller)
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Make sure user owns product or is admin
    if (
      product.seller.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await product.remove();
    res.json({ message: "Product removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   GET /api/products/brands
// @desc    Get all brands
// @access  Public
router.get("/brands", async (req, res) => {
  try {
    const brands = await Product.distinct("brand");
    res.json(brands);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/products/categories
// @desc    Get all categories
// @access  Public
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
