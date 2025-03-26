import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/landing_page/LandingPage";
import Login from "./Components/login/Login";
import SignUp from "./Components/sign_up/Sign_Up";
import Service from "./Components/service/Service";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation";
import BookingConsultation from "./Components/Appointment/BookingConsultation";
import Notification from "./Components/Notification/Notification";
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import ProfileCard from "./Components/ProfileCard/ProfileCard";
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Notification />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/service" element={<Service />} />
          <Route
            path="/instant-consultation"
            element={<InstantConsultation />}
          />
          <Route path="/appointment" element={<BookingConsultation />} />
          <Route path="/reviews" element={<ReviewForm />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/reports" element={<ReportsLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
