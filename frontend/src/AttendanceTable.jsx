const weeks = Array.from({ length: 20 }, (_, i) => `W${i + 1}`);

const getNextStatus = (current) => {
  if (current === "unmarked") return "present";
  if (current === "present") return "absent";
  return "unmarked";
};

const getCellStyle = (status) => {
  if (status === "present") return { backgroundColor: "#90EE90" };
  if (status === "absent") return { backgroundColor: "#FF7F7F" };
  return { backgroundColor: "white" };
};

const AttendanceTable = ({ data, setData }) => {

  const handleClick = (rowIndex, week) => {
    const updated = [...data];
    const current = updated[rowIndex].attendance[week];
    updated[rowIndex].attendance[week] = getNextStatus(current);
    setData(updated);
  };

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Name</th>
          <th>Register No</th>
          <th>Guide</th>
          {weeks.map(w => <th key={w}>{w}</th>)}
        </tr>
      </thead>

      <tbody>
        {data.map((student, index) => (
          <tr key={student.registerNumber}>
            <td>{student.name}</td>
            <td>{student.registerNumber}</td>
            <td>{student.guideName}</td>

            {weeks.map(w => (
              <td
                key={w}
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  ...getCellStyle(student.attendance[w])
                }}
                onClick={() => handleClick(index, w)}
              >
                {student.attendance[w] === "present" && "P"}
                {student.attendance[w] === "absent" && "A"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
