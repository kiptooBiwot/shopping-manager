const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: String,
    shops: [String],
    quantities: {
      [process.env.STORE1]: {
        type: Number,
        default: 0,
      },
      [process.env.STORE2]: {
        type: Number,
        default: 0,
      },
      [process.env.STORE3]: {
        type: Number,
        default: 0,
      },
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
