import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import LandingPage from "./Components/landing_page/LandingPage";
import Login from "./Components/login/Login";
import SignUp from "./Components/sign_up/Sign_Up";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
