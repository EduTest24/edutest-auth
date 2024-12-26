const express = require("express");
const router = express.Router();
const JeeMain = require("../models/JeeMain");

// Filter Endpoint
app.post("/", async (req, res) => {
  const { subject } = req.body; // Extract subject from request body

  const query = {};
  if (subject) query.subject = subject; // Apply subject filter

  try {
    const results = await JeeMain.find(query); // Query MongoDB
    res.json(results); // Send matching questions
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
