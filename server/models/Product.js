const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  image: String,
  shops: [String]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
