const mongoose = require("mongoose");

const JeeMainSchema = new mongoose.Schema({
  solution: Object,
  examInfo: Object,
  subject: String,
  type: String,
  text: String,
  image: String,
  options: Array,
  correctAnswer: Number,
  timeTaken: Number,
  difficulty: String,
  chapters: Array,
  topics: Array,
});

module.exports = mongoose.model("JeeMain", JeeMainSchema);
