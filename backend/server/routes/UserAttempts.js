const express = require("express");
const router = express.Router();
const UserAttempts = require("../models/Attempts");

router.post("/attempts", async (req, res) => {
  const {
    userId,
    username,
    attemptId,
    examId, // Unique ID for the exam
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
    // Check if the user's document exists
    let user = await UserAttempts.findOne({ username });

    if (!user) {
      // Create a new document if the user doesn't exist
      user = new UserAttempts({
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
      // Check if the examId already exists in the user's document
      const exam = user.exams.find((e) => e.examId === examId);

      if (!exam) {
        // Add a new exam with the first attempt
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
        // Add the new attempt to the existing exam
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

    // Save the document
    await user.save();
    res.status(200).json({ message: "Attempt saved successfully!" });
  } catch (error) {
    console.error("Error saving attempt:", error);
    res.status(500).json({ message: "Failed to save attempt.", error });
  }
});

module.exports = router;
