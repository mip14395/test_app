import "./Notification.css";
import React, { useEffect, useState } from "react";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setIsLoggedIn(true);
    }

    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:3001/appointments");
        const data = await res.json();

        console.log("Fetched Appointments:", data);
        console.log("Stored Email:", storedEmail);

        const userAppointment = data.find((appt) => appt.email === storedEmail);
        console.log("User Appointment:", userAppointment);

        setAppointmentData(userAppointment || null);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      {children}

      {isLoggedIn && appointmentData && (
        <div className="appointment-card">
          <h3 className="appointment-card__title">Appointment Details</h3>
          <p>
            <strong>Doctor:</strong> {appointmentData.doctorName}
          </p>
          <p>
            <strong>Speciality:</strong> {appointmentData.doctorSpeciality}
          </p>
          <p>
            <strong>Name:</strong> {appointmentData.name}
          </p>
          <p>
            <strong>Phone Number:</strong> {appointmentData.phoneNumber}
          </p>
          <p>
            <strong>Date of Appointment:</strong> {appointmentData.date}
          </p>
          <p>
            <strong>Time Slot:</strong> {appointmentData.selectedSlot}
          </p>
        </div>
      )}
    </div>
  );
};

export default Notification;
