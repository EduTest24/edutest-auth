const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  testDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
