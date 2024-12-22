const express = require("express");
const router = express.Router();
const JeeResult = require("../models/JeeResult");

router.post("/jeemain/result", async (req, res) => {
  const {
    username,
    score,
    correctAnswers,
    incorrectAnswers,
    markedQuestions,
    reviewedQuestions,
    skippedQuestions,
    timeTaken, // Array of time spent on individual questions
  } = req.body;

  try {
    const result = new JeeResult({
      username,
      score,
      correctAnswers,
      incorrectAnswers,
      markedQuestions,
      reviewedQuestions,
      skippedQuestions,
      timeTaken,
    });

    await result.save();
    res.status(201).json({ message: "Result saved successfully", result });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ error: "Error saving result" });
  }
});

module.exports = router;
