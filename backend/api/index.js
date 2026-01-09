require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

const app = express();

let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

app.use(cors());
app.use(express.json());

app.use("/api/attendance", require("../routes/attendanceRoutes"));

app.get("/", (req, res) => {
  res.send("Attendance API running on Vercel 🚀");
});

module.exports = app;
