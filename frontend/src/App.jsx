import { useEffect, useState } from "react";
import api from "./api";
import AttendanceTable from "./AttendanceTable";

function App() {
  const [students, setStudents] = useState([]);

  // Fetch attendance on page load
  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const res = await api.get("/attendance");
    setStudents(res.data);
  };

  // Send updated attendance to backend
  const updateAttendance = async () => {
    await api.put("/attendance", students);
    alert("Attendance updated successfully");
  };

  // Download Excel
  const downloadExcel = async () => {
    const res = await api.get("/attendance/export", {
      responseType: "blob",
    });

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.xlsx";
    a.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AG1 Student Attendance - 21CSP401L</h2>
      <h4>Faculty Advisor : Dr. Prabhu Kavin B</h4>

      <AttendanceTable data={students} setData={setStudents} />

      <br />

      <button onClick={updateAttendance}>Update Attendance</button>
      <button onClick={downloadExcel} style={{ marginLeft: "10px" }}>
        Download Excel
      </button>
    </div>
  );
}

export default App;
