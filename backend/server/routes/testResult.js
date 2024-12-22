const express = require("express");
const app = express();
const TestResult = require("../models/TestResult");

app.post("/api/test-result", async (req, res) => {
  const { username, score, totalQuestions, selectedOptions } = req.body;

  try {
    const testResult = new TestResult({
      username,
      score,
      totalQuestions,
      selectedOptions,
      timestamp: new Date(),
    });
    await testResult.save();
    res.status(201).json({ message: "Test result saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save test result" });
  }
});

module.exports = app;
