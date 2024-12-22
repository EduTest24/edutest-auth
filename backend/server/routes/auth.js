const express = require("express");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Password Strength Checker
const passwordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long.",
    };
  }
  if (!hasUpperCase || !hasLowerCase) {
    return {
      valid: false,
      message: "Password must contain both uppercase and lowercase letters.",
    };
  }
  if (!hasDigits) {
    return {
      valid: false,
      message: "Password must contain at least one digit.",
    };
  }
  if (!hasSpecialChars) {
    return {
      valid: false,
      message: "Password must contain at least one special character.",
    };
  }

  return { valid: true, message: "Password is strong." };
};

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Check password strength
  const passwordCheck = passwordStrength(password);
  if (!passwordCheck.valid) {
    return res.status(400).json({ message: passwordCheck.message });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user to the database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user and set the sign-up timestamp
    await newUser.save();

    res.status(201).json({ message: "User successfully registered!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Signin Route
const JWT_SECRET =
  "d46071e8a98b4bcad3dde2ffda6b0376dd08daa2cfae51d22c0867b5aa652efca28e1af8d2a2e355b9851c75d71bb90676f27652c08e874218cd215702392261";

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Log the current timestamp for sign-in
    const timestamp = new Date();
    user.signIns.push(timestamp); // `signIns` is an array in the User schema
    await user.save();

    // Generate token and send response
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Sign in successful",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signout", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the current timestamp for sign-out
    const timestamp = new Date();
    user.signOuts.push(timestamp); // `signOuts` is an array in the User schema
    await user.save();

    res.status(200).json({ message: "Sign out logged successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
