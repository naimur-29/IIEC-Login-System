const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, default: "" },
  createdAt: { type: String, required: true },
  active: { type: Boolean, required: true },
  lastJoinedAt: { type: String, default: "" },
});

module.exports = mongoose.model("User", userSchema);
