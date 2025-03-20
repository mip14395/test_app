import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  // State lưu trữ email, password và lỗi
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Xử lý khi form được submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    // Nếu có lỗi, cập nhật state
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Login successful", { email, password });
      alert("Login Successful!");
    }
  };

  return (
    <div className="container-l">
      <div className="login-box">
        <h2>Login</h2>
        <p>
          Are you a new member? <Link to="/signup">Sign Up</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <p className="forgot-password">
            <Link to="/"> Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
