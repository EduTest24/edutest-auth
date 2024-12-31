const express = require("express");
const router = express.Router();
const MHTCET = require("../models/cetExam");

// GET route to fetch all MHTCET questions
router.get("/", async (req, res) => {
  try {
    const questions = await MHTCET.find(); // Retrieve all documents
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching MHTCET data:", error);
    res.status(500).json({ message: "Failed to fetch data.", error });
  }
});

// Optional: GET route to filter questions by subject
router.get("/subject/:subject", async (req, res) => {
  const { subject } = req.params;
  try {
    const questions = await MHTCET.find({ subject }); // Filter by subject
    if (questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for this subject." });
    }
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching MHTCET data by subject:", error);
    res.status(500).json({ message: "Failed to fetch data.", error });
  }
});

// Optional: GET route to filter questions by difficulty level
router.get("/difficulty/:level", async (req, res) => {
  const { level } = req.params;
  try {
    const questions = await MHTCET.find({ difficulty: level }); // Filter by difficulty
    if (questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for this difficulty level." });
    }
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching MHTCET data by difficulty:", error);
    res.status(500).json({ message: "Failed to fetch data.", error });
  }
});

module.exports = router;
