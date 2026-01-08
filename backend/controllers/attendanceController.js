const Attendance = require("../models/Attendance");
const ExcelJS = require("exceljs");

// GET all attendance
exports.getAttendance = async (req, res) => {
  const data = await Attendance.find().sort({ registerNumber: 1 });
  res.json(data);
};

// UPDATE attendance (replace all)
exports.updateAttendance = async (req, res) => {
  const updatedData = req.body;

  for (const student of updatedData) {
    await Attendance.findOneAndUpdate(
      { registerNumber: student.registerNumber },
      student,
      { upsert: true }
    );
  }

  res.json({ message: "Attendance updated successfully" });
};

// EXPORT Excel
exports.exportAttendance = async (req, res) => {
  const students = await Attendance.find();
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Attendance");

  sheet.columns = [
    { header: "Name", key: "name" },
    { header: "Register Number", key: "registerNumber" },
    { header: "Guide Name", key: "guideName" },
    ...Array.from({ length: 20 }, (_, i) => ({
      header: `W${i + 1}`,
      key: `W${i + 1}`
    }))
  ];

  students.forEach(s => {
    const row = sheet.addRow({
      name: s.name,
      registerNumber: s.registerNumber,
      guideName: s.guideName,
      ...s.attendance
    });

    // Apply colors
    for (let i = 4; i <= 23; i++) {
      const cell = row.getCell(i);
      if (cell.value === "present") {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF90EE90" } // green
        };
      }
      if (cell.value === "absent") {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFF7F7F" } // red
        };
      }
    }
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=attendance.xlsx"
  );

  await workbook.xlsx.write(res);
  res.end();
};
