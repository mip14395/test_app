import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../asset/image/logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("email");
    setIsLoggedIn(false);
    window.location.reload(); // Load lại trang để cập nhật trạng thái
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
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/instant-consultation">
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
            Welcome, <span>{email?.split("@")[0]}</span>
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
    </header>
  );
};

export default Navbar;
