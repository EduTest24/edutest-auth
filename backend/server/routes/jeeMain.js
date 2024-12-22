const express = require("express");
const router = express.Router();
const jeeMain = require("../models/JeeMains");

// Get JEE Mains questions
router.get("/jeemain", async (req, res) => {
  try {
    const questions = await jeeMain.find(); // Fetch all JEE Mains questions
    res.send(questions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching questions" });
  }
});

module.exports = router;
