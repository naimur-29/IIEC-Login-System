const mongoose = require("mongoose");

const History = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.Model("History", History);
