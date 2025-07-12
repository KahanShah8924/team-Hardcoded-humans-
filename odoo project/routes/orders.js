const express = require("express");
const { check, validationResult } = require("express-validator");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("items", "Items are required").isArray({ min: 1 }),
      check("shippingAddress", "Shipping address is required").not().isEmpty(),
      check("paymentMethod", "Payment method is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { items, shippingAddress, billingAddress, paymentMethod } =
        req.body;

      // Calculate totals and validate items
      let subtotal = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await Product.findById(item.product);

        if (!product) {
          return res
            .status(404)
            .json({ message: `Product ${item.product} not found` });
        }

        if (product.status !== "available") {
          return res
            .status(400)
            .json({ message: `Product ${product.title} is not available` });
        }

        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        orderItems.push({
          product: item.product,
          quantity: item.quantity,
          price: product.price,
        });

        // Update product status to sold
        product.status = "sold";
        await product.save();
      }

      const tax = subtotal * 0.08; // 8% tax
      const shippingCost = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
      const total = subtotal + tax + shippingCost;

      const newOrder = new Order({
        user: req.user.id,
        items: orderItems,
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        paymentMethod,
        subtotal,
        tax,
        shippingCost,
        total,
      });

      const order = await newOrder.save();
      await order.populate("items.product");

      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Make sure user owns order or is admin
    if (
      order.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "User not authorized" });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private (Admin)
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only admin can update status
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "User not authorized" });
    }

    order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (status === "shipped") {
      order.estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    }

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
