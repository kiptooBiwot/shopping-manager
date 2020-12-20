const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 15,
    unique: true,
    match: /(^[a-zA-Z0-9_]+$)/,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
