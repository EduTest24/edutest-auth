// routes/reportRoutes.js
const express = require("express");
const Report = require("../models/Report"); // Import the Report model

const router = express.Router();

// POST route to handle report submissions
router.post("/api/report", async (req, res) => {
  const { username, questionId, timestamp } = req.body;

  if (!username || !questionId || !timestamp) {
    return res.status(400).json({ message: "Invalid request data." });
  }

  try {
    // Check if the report already exists
    const existingReport = await Report.findOne({ username, questionId });
    if (existingReport) {
      return res
        .status(400)
        .json({
          message: "You have already submitted a report for this question.",
        });
    }

    // Insert new report
    const newReport = new Report({ username, questionId, timestamp });
    await newReport.save();

    res.status(201).json({ message: "Report submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
