const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  name: String,
  price: Number,
  details: String,
  stock: Number,
  category: String,
  image_url: String,
  expiry_date: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("productInfo", Product);
