const express = require("express");
const { auth } = require("../middleware/auth");

const router = express.Router();

// In-memory cart storage (in production, use Redis or database)
let carts = new Map();

// @route   GET /api/cart
// @desc    Get user cart
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const userCart = carts.get(req.user.id) || [];
    res.json(userCart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    let userCart = carts.get(req.user.id) || [];

    // Check if product already in cart
    const existingItem = userCart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      userCart.push({ productId, quantity });
    }

    carts.set(req.user.id, userCart);

    res.json(userCart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT /api/cart/:productId
// @desc    Update cart item quantity
// @access  Private
router.put("/:productId", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    let userCart = carts.get(req.user.id) || [];

    const item = userCart.find(
      (item) => item.productId === req.params.productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      userCart = userCart.filter(
        (item) => item.productId !== req.params.productId
      );
    } else {
      item.quantity = quantity;
    }

    carts.set(req.user.id, userCart);

    res.json(userCart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE /api/cart/:productId
// @desc    Remove item from cart
// @access  Private
router.delete("/:productId", auth, async (req, res) => {
  try {
    let userCart = carts.get(req.user.id) || [];

    userCart = userCart.filter(
      (item) => item.productId !== req.params.productId
    );

    carts.set(req.user.id, userCart);

    res.json(userCart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    carts.delete(req.user.id);
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
