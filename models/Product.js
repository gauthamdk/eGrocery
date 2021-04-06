const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    name: String,
    details: String,
    stock: Number,
    category: String,
    image_url: String
  });

  module.exports = mongoose.model('productInfo', Product);