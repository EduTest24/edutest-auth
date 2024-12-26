const express = require("express");
const router = express.Router();
const JeeMain = require("../models/JeeMain");

// Filter Endpoint
router.post("/", async (req, res) => {
  const filters = req.body;

  const query = {};
  if (filters.session) query["examInfo.session"] = filters.session;
  if (filters.date)
    query["examInfo.date"] = {
      $gte: new Date(filters.date.start),
      $lte: new Date(filters.date.end),
    };
  if (filters.subject) query.subject = filters.subject;
  if (filters.difficulty) query.difficulty = filters.difficulty;
  if (filters.chapters) query.chapters = { $in: filters.chapters };
  if (filters.topics) query.topics = { $in: filters.topics };

  try {
    const results = await JeeMain.find(query);
    res.json(results);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
