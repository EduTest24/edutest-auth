// models/Report.js
const mongoose = require("mongoose");

// MongoDB Schema for Report
const reportSchema = new mongoose.Schema({
  username: { type: String, required: true },
  questionId: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

// Export the Report Model
module.exports = mongoose.model("Report", reportSchema);
