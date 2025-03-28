import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import { v4 as uuidv4 } from "uuid";

const DoctorCard = ({ name, speciality, experience, ratings }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const storedEmail = sessionStorage.getItem("email");

  useEffect(() => {
    fetch("http://localhost:3001/appointments")
      .then((res) => res.json())
      .then((data) => {
        const doctorAppointments = data.filter(
          (appointment) => appointment.doctorName === name
        );
        setAppointments(doctorAppointments);
      })
      .catch((err) => console.error("Error fetching appointments:", err));
  }, [name]);

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      doctorName: name,
      doctorSpeciality: speciality,
      ...appointmentData,
      email: storedEmail,
    };

    fetch("http://localhost:3001/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAppointment),
    })
      .then((res) => res.json())
      .then(() => {
        setAppointments([...appointments, newAppointment]);
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = (appointmentId) => {
    fetch(`http://localhost:3001/appointments/${appointmentId}`, {
      method: "DELETE",
    })
      .then(() => {
        setAppointments(appointments.filter((a) => a.id !== appointmentId));
        sessionStorage.removeItem("userAppointment");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          trigger={
            <button
              className={`book-appointment-btn ${
                appointments.length > 0 ? "cancel-appointment" : ""
              }`}
            >
              {appointments.length > 0
                ? "Cancel Appointment"
                : "Book Appointment"}
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ overflow: "scroll" }}>
              <div>
                <div className="doctor-card-profile-image-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46"
                    height="46"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">
                    {speciality}
                  </div>
                  <div className="doctor-card-detail-experience">
                    {experience} years experience
                  </div>
                  <div className="doctor-card-detail-consultationfees">
                    Ratings: {ratings}
                  </div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: "center" }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date of Appointment: {appointment.date}</p>
                      <p>Time Slot: {appointment.selectedSlot}</p>
                      <button onClick={() => handleCancel(appointment.id)}>
                        Cancel Appointment
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm
                  doctorName={name}
                  doctorSpeciality={speciality}
                  onSubmit={handleFormSubmit}
                />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;
