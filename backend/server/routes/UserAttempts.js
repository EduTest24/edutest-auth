const express = require("express");
const router = express.Router();
const UserAttempts = require("../models/Attempts");

router.post("/attempts", async (req, res) => {
  const {
    attemptId,
    username,
    examId,
    score,
    correctAnswers,
    incorrectAnswers,
    markedQuestions,
    reviewedQuestions,
    skippedQuestions,
    timeTaken,
    timestamp,
  } = req.body;

  try {
    // Validate input
    if (!username || !examId || !attemptId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await UserAttempts.findOne({ username });

    if (!user) {
      user = new UserAttempts({
        userId: username, // Populate `userId` with a unique value
        username,
        exams: [
          {
            examId,
            attempts: [
              {
                attemptId,
                score,
                correctAnswers,
                incorrectAnswers,
                markedQuestions,
                reviewedQuestions,
                skippedQuestions,
                timeTaken,
                timestamp,
              },
            ],
          },
        ],
      });
    } else {
      const exam = user.exams.find((e) => e.examId === examId);

      if (!exam) {
        user.exams.push({
          examId,
          attempts: [
            {
              attemptId,
              score,
              correctAnswers,
              incorrectAnswers,
              markedQuestions,
              reviewedQuestions,
              skippedQuestions,
              timeTaken,
              timestamp,
            },
          ],
        });
      } else {
        exam.attempts.push({
          attemptId,
          score,
          correctAnswers,
          incorrectAnswers,
          markedQuestions,
          reviewedQuestions,
          skippedQuestions,
          timeTaken,
          timestamp,
        });
      }
    }

    await user.save();
    res.status(200).json({ message: "Attempt saved successfully!" });
  } catch (error) {
    console.error("Error saving attempt:", error.message);
    res.status(500).json({ message: "Failed to save attempt.", error });
  }
});

module.exports = router;
