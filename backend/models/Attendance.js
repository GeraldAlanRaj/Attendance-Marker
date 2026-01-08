const mongoose = require("mongoose");

const statusEnum = ["unmarked", "present", "absent"];

const AttendanceSchema = new mongoose.Schema({
  name: String,
  registerNumber: { type: String, unique: true },
  guideName: String,
  attendance: {
    W1: { type: String, enum: statusEnum, default: "unmarked" },
    W2: { type: String, enum: statusEnum, default: "unmarked" },
    W3: { type: String, enum: statusEnum, default: "unmarked" },
    W4: { type: String, enum: statusEnum, default: "unmarked" },
    W5: { type: String, enum: statusEnum, default: "unmarked" },
    W6: { type: String, enum: statusEnum, default: "unmarked" },
    W7: { type: String, enum: statusEnum, default: "unmarked" },
    W8: { type: String, enum: statusEnum, default: "unmarked" },
    W9: { type: String, enum: statusEnum, default: "unmarked" },
    W10:{ type: String, enum: statusEnum, default: "unmarked" },
    W11:{ type: String, enum: statusEnum, default: "unmarked" },
    W12:{ type: String, enum: statusEnum, default: "unmarked" },
    W13:{ type: String, enum: statusEnum, default: "unmarked" },
    W14:{ type: String, enum: statusEnum, default: "unmarked" },
    W15:{ type: String, enum: statusEnum, default: "unmarked" },
    W16:{ type: String, enum: statusEnum, default: "unmarked" },
    W17:{ type: String, enum: statusEnum, default: "unmarked" },
    W18:{ type: String, enum: statusEnum, default: "unmarked" },
    W19:{ type: String, enum: statusEnum, default: "unmarked" },
    W20:{ type: String, enum: statusEnum, default: "unmarked" }
  }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
