const express = require("express");
const router = express.Router();
const UserAttempts = require("../models/Attempts"); // Adjust path if needed

// Endpoint to get user data by username
router.get("/user/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch user data by username
    const userData = await UserAttempts.findOne({ username });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Failed to fetch user data", error });
  }
});

module.exports = router;
