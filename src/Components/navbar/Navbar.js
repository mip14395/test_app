import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./Navbar.css";
import logo from "../../asset/image/logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("email");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <header id="header" className="fixed-top d-flex align-items-center px-4">
      <Link to="/" className="logo d-flex align-items-center">
        <span>MSCHealth</span>
        <img src={logo} alt="logo msc health" />
      </Link>

      <nav id="navbar">
        <ul className="d-flex list-unstyled align-items-center mb-0">
          <li>
            <Link className="nav-link" to="/service">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/appointment">
              Appointments
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/healthblog">
              Health Blog
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/reviews">
              Reviews
            </Link>
          </li>
        </ul>
      </nav>

      <div className="button-a">
        {isLoggedIn ? (
          <div className="user-info">
            <span
              className="welcome-text"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Welcome, {email?.split("@")[0]}
            </span>

            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => setShowDropdown(false)}>
                  Your Profile
                </Link>
                <p>
                  <Link to="/reports">Your Reports</Link>
                </p>
              </div>
            )}

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/signup" className="sign-up-btn">
              Sign Up
            </Link>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </>
        )}
      </div>

      {showProfileModal && (
        <ProfileCard closeProfile={() => setShowProfileModal(false)} />
      )}
    </header>
  );
};

export default Navbar;
