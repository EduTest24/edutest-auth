const express = require("express");
const router = express.Router();
const User = require("../models/cetAttempt"); // Import the schema

// Endpoint to save or update the exam attempt for a user
router.post("/attempts", async (req, res) => {
  try {
    const {
      attemptId,
      username,
      userId,
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

    // Create the attempt object
    const attempt = {
      attemptId,
      score,
      correctAnswers,
      incorrectAnswers,
      markedQuestions,
      reviewedQuestions,
      skippedQuestions,
      timeTaken,
      timestamp,
    };
    // Validate input
    if (!username || !examId || !attemptId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Find the user by username
    let user = await User.findOne({ username });

    if (user) {
      // If user exists, check if the exam already exists
      let exam = user.exams.find((exam) => exam.examId === examId);

      if (exam) {
        // If the exam exists, push the new attempt to the attempts array
        exam.attempts.push(attempt);
      } else {
        // If the exam doesn't exist, create a new exam and add the attempt
        user.exams.push({
          examId,
          attempts: [attempt],
        });
      }

      // Save the user document
      await user.save();
    } else {
      // If the user does not exist, create a new user document with the exam and attempt
      user = new User({
        userId,
        username,
        exams: [
          {
            examId,
            attempts: [attempt],
          },
        ],
      });

      await user.save();
    }

    res
      .status(201)
      .json({ message: "Exam results saved/updated successfully!" });
  } catch (err) {
    console.error("Error saving exam attempt:", err);
    res
      .status(500)
      .json({ message: "Failed to save results. Please try again." });
  }
});

// Endpoint to fetch the user's exam results
router.get("/results/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the exams data with attempts
    const exams = user.exams;

    // Format the response to include only necessary data
    const resultData = exams.map((exam) => ({
      examId: exam.examId,
      attempts: exam.attempts.map((attempt) => ({
        score: attempt.score,
        timestamp: attempt.timestamp,
        correctAnswers: attempt.correctAnswers,
        incorrectAnswers: attempt.incorrectAnswers,
        markedQuestions: attempt.markedQuestions,
        reviewedQuestions: attempt.reviewedQuestions,
        skippedQuestions: attempt.skippedQuestions,
        timeTaken: attempt.timeTaken,
      })),
    }));

    res.status(200).json(resultData);
  } catch (err) {
    console.error("Error fetching exam results:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch results. Please try again." });
  }
});

module.exports = router;
