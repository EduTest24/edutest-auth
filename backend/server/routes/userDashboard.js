const express = require("express");
const router = express.Router();
const ExamResult = require("../models/JeeResult"); // MongoDB model for exam results

// GET request to fetch the user's exam results
router.get("/results/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const results = await ExamResult.find({ username }).sort({ timestamp: -1 }); // Sort by timestamp, most recent first
    res.json(results);
  } catch (error) {
    console.error("Error fetching user results:", error);
    res.status(500).json({ message: "Error fetching results" });
  }
});

module.exports = router;
