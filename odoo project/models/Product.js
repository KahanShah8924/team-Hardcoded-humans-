const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Women", "Men", "Kids", "Home", "Accessories"],
  },
  subcategory: {
    type: String,
    required: true,
    enum: [
      "Tops",
      "Bottoms",
      "Dresses",
      "Outerwear",
      "Shoes",
      "Bags",
      "Jewelry",
      "Activewear",
      "Lingerie",
      "Swimwear",
      "Maternity",
      "Plus Size",
      "Furniture",
      "Decor",
      "Kitchen",
      "Bath",
      "Bedding",
    ],
  },
  condition: {
    type: String,
    required: true,
    enum: ["Like New", "Excellent", "Good", "Fair"],
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  material: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  tags: [String],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "sold", "pending"],
    default: "available",
  },
  location: {
    city: String,
    state: String,
    country: String,
  },
  measurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    length: Number,
    sleeve: Number,
  },
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  favorites: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create text index for search
productSchema.index({
  title: "text",
  description: "text",
  brand: "text",
  tags: "text",
});

module.exports = mongoose.model("Product", productSchema);
