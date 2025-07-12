const express = require("express");
const User = require("../models/User");
const { auth, admin } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", auth, async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/users/wishlist
// @desc    Get user wishlist
// @access  Private
router.get("/wishlist", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");

    res.json(user.wishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/users/wishlist/:productId
// @desc    Add product to wishlist
// @access  Private
router.post("/wishlist/:productId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.wishlist.includes(req.params.productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push(req.params.productId);
    await user.save();

    res.json({ message: "Product added to wishlist" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE /api/users/wishlist/:productId
// @desc    Remove product from wishlist
// @access  Private
router.delete("/wishlist/:productId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.productId
    );

    await user.save();

    res.json({ message: "Product removed from wishlist" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/users (Admin only)
// @desc    Get all users
// @access  Private (Admin)
router.get("/", [auth, admin], async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT /api/users/:id/role
// @desc    Update user role
// @access  Private (Admin)
router.put("/:id/role", [auth, admin], async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
