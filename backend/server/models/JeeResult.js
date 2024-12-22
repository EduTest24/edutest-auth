const mongoose = require("mongoose");

// JEE Mains Exam schema
const resultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  examName: { type: String, default: "JEE Mains" },
  timestamp: { type: Date, default: Date.now },
  score: { type: Number, required: true },
  correctAnswers: { type: [String], required: true }, // Array of correct question IDs
  incorrectAnswers: { type: [String], required: true }, // Array of incorrect question IDs
  markedQuestions: { type: [String], default: [] }, // Array of marked question IDs
  reviewedQuestions: { type: [String], default: [] }, // Array of reviewed question IDs
  skippedQuestions: { type: [String], default: [] }, // Array of skipped question IDs
  timeTaken: { type: [String], required: true }, // Array of time spent on each question
});

const JeeResult = mongoose.model("jeeresults", resultSchema);
module.exports = JeeResult;
