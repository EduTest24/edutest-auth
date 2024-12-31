const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  attemptId: { type: String, required: true }, // Unique ID for the attempt
  score: { type: Number, required: true }, // Total score for the attempt
  correctAnswers: { type: [String], required: true }, // List of correct question IDs
  incorrectAnswers: { type: [String], required: true }, // List of incorrect question IDs
  markedQuestions: { type: [String], required: true }, // List of marked question IDs
  reviewedQuestions: { type: [String], required: true }, // List of reviewed question IDs
  skippedQuestions: { type: [String], required: true }, // List of skipped question IDs
  timeTaken: { type: [Number], required: true }, // Time taken for each question (Array of time taken for each question)
  timestamp: { type: Date, required: true }, // Timestamp of the attempt
});

const examSchema = new mongoose.Schema({
  examId: { type: Number, required: true }, // Unique numeric ID for the exam
  attempts: { type: [attemptSchema], default: [] }, // Array of attempts for this exam
});

const userAttemptsSchema = new mongoose.Schema({
  userId: { type: String, unique: true }, // Add a unique identifier for the user
  username: { type: String, required: true }, // User's username
  exams: { type: [examSchema], default: [] }, // Array of exams with attempts
});

module.exports = mongoose.model("cetattempts", userAttemptsSchema);
