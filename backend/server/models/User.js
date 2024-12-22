const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  signIns: [{ type: Date }], // Array to store sign-in timestamps
  signOuts: [{ type: Date }], // Array to store sign-out timestamps
});

module.exports = mongoose.model("User", userSchema);
