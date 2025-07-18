const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const admin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Admin only." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const seller = async (req, res, next) => {
  try {
    if (req.user && (req.user.role === "seller" || req.user.role === "admin")) {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Seller only." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { auth, admin, seller };
