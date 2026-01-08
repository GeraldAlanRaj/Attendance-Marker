import { useEffect, useState } from "react";
import api from "./api";
import AttendanceTable from "./AttendanceTable";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState("ALL");
  const [searchText, setSearchText] = useState("");

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

  // Extract unique guide names
  const guideNames = [
    "ALL",
    ...new Set(students.map(s => s.guideName).filter(Boolean)),
  ];

  // 🔍 Apply BOTH filters together
  const filteredStudents = students.filter(student => {
    const matchesGuideDropdown =
      selectedGuide === "ALL" || student.guideName === selectedGuide;

    const search = searchText.toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(search) ||
      student.registerNumber.toLowerCase().includes(search) ||
      student.guideName.toLowerCase().includes(search);

    return matchesGuideDropdown && matchesSearch;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>AG1 Student Attendance - 21CSP401L</h2>
      <h4>Faculty Advisor : Dr. Prabhu Kavin B</h4>

      <div style={{ marginBottom: "15px" }}>
        <select
          value={selectedGuide}
          onChange={(e) => setSelectedGuide(e.target.value)}
          style={{ padding: "8px", fontSize: "14px" }}
        >
          {guideNames.map(guide => (
            <option key={guide} value={guide}>
              {guide}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search name / register no / guide"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            marginLeft: "10px",
            padding: "8px",
            fontSize: "14px",
            width: "280px",
          }}
        />
      </div>

      <AttendanceTable data={filteredStudents} setData={setStudents} />

      <br />

      <button
        style={{
          cursor: "pointer",
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "6px",
        }}
        onClick={updateAttendance}
      >
        Update Attendance
      </button>

      <button
        style={{
          cursor: "pointer",
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "6px",
          marginLeft: "10px",
        }}
        onClick={downloadExcel}
      >
        Download Excel
      </button>
    </div>
  );
}

export default App;
