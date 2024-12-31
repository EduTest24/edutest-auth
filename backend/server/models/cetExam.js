const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: { type: String, default: "" },
  image: { type: String, default: "" },
});

const solutionSchema = new mongoose.Schema({
  text: { type: String, default: "" },
  image: { type: String, default: "" },
});

const examInfoSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Date of the exam
  shift: { type: String, required: true }, // Morning or Afternoon shift
});

const mhtcetSchema = new mongoose.Schema({
  subject: { type: String, required: true }, // Subject (e.g., Physics, Chemistry)
  examInfo: { type: examInfoSchema, required: true }, // Nested exam info
  type: { type: String, required: true }, // Question type (e.g., SCQ, MCQ)
  text: { type: String, default: "" }, // Question text
  image: { type: String, default: "" }, // URL to question image
  options: { type: [optionSchema], required: true }, // Array of options
  correctAnswer: { type: Number, required: true }, // Index of the correct answer
  difficulty: { type: String, required: true }, // Difficulty level (e.g., Easy, Medium, Hard)
  solution: { type: solutionSchema, default: {} }, // Solution text and image
  chapters: { type: [String], default: [] }, // List of chapters
  topics: { type: [String], default: [] }, // List of topics
});

module.exports = mongoose.model("MHTCET", mhtcetSchema);
