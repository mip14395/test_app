import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = ({ closeProfile }) => {
  const [userDetails, setUserDetails] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const email = sessionStorage.getItem("email");
      const response = await fetch(
        `http://localhost:3001/users?email=${email}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setUserDetails(data[0]);
        }
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userDetails.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
        }
      );

      if (response.ok) {
        alert("Profile Updated!");
        setEditMode(false);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={userDetails.email || ""}
              readOnly
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userDetails.name || ""}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={userDetails.phone || ""}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="save-btn">
            Save
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.phone}
          </p>
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
