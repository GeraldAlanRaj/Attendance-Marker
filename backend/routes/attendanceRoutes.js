const express = require("express");
const router = express.Router();
const {
  getAttendance,
  updateAttendance,
  exportAttendance
} = require("../controllers/attendanceController");

router.get("/", getAttendance);
router.put("/", updateAttendance);
router.get("/export", exportAttendance);

module.exports = router;
