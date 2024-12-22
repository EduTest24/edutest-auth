const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  subject: { type: String, required: true },
  type: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, default: "" },
  options: [
    {
      text: { type: String, required: true },
      image: { type: String, default: "" },
    },
  ],
  correctAnswer: { type: Number, required: true },
  difficulty: { type: String, required: true },
  solution: {
    text: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  chapters: [String],
  topics: [String],
});

const JeeQuestions = mongoose.model("jeemains", questionSchema);
module.exports = JeeQuestions;
