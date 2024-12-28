const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./server/routes/auth");
const question = require("./server/routes/question");
const testResult = require("./server/routes/testResult");
const jeeMain = require("./server/routes/jeeMain");
const jeeResult = require("./server/routes/jeeResult");
const UserDashboard = require("./server/routes/userDashboard");
const filterRoutes = require("./server/routes/filterRoutes");
const reportRoutes = require("./server/routes/reportRoutes");

const PORT = process.env.PORT || 5000;
const MongoDB = process.env.MONGODB_URI; // Debugging line
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes Setup
app.use("/auth", authRoutes);
app.use("/", question);
app.use("/", testResult);
app.use("/api/exam", jeeMain);
app.use("/api/exam", jeeResult);
app.use("/api/exam", UserDashboard);
app.use("/api/filter", filterRoutes);
app.use("/", reportRoutes);

app.use("/", (req, res) => {
  res.send("Hello, World! Backend is working");
});

// MongoDB connection
mongoose
  .connect(MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
