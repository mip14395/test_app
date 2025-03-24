import React, { useEffect, useState } from "react";
import "./InstantConsultation.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC";

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    }

    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        const speciality = searchParams.get("speciality");
        if (speciality) {
          const filtered = data.filter(
            (doctor) =>
              doctor.speciality.toLowerCase() === speciality.toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        }
      })
      .catch((err) => console.log(err));
  }, [searchParams, navigate]);

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }

    const filtered = doctors.filter((doctor) =>
      doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC onSearch={handleSearch} />
        <div className="search-results-container">
          {isSearched && (
            <center>
              <h2>{filteredDoctors.length} doctors available</h2>
              <h3>
                Book appointments with minimum wait-time & verified doctor
                details
              </h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCardIC {...doctor} key={doctor.name} />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          )}
        </div>
      </div>
    </center>
  );
};

export default InstantConsultation;
