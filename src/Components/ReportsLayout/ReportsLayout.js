import React, { useEffect, useState } from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:3001/reviews");
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        throw new Error("Failed to fetch reports");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                <a
                  href={report.report}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="view-btn">View Report</button>
                </a>
              </td>
              <td>
                <a href={report.report} download>
                  <button className="download-btn">Download Report</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
