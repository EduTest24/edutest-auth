const express = require("express");
const router = express.Router();
const Question = require("../models/Question"); // Assuming you have a Question model

// POST route to save a new question
router.post("/admin/questions", async (req, res) => {
  const { questionText, options, correctOption, solution } = req.body;

  // Validate data
  if (!questionText || !options || !correctOption || !solution) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create new question
  const newQuestion = new Question({
    questionText,
    options,
    correctOption,
    solution,
    createdAt: new Date(), // Store timestamp when question was created
  });

  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json({
      message: "Question added successfully!",
      question: savedQuestion,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add question" });
  }
});

router.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.send(questions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

module.exports = router;
