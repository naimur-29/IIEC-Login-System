const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  createdAt: { type: String, required: true },
  active: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", userSchema);
