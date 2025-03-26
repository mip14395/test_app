import React, { useEffect, useState } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/appointmentsIC")
      .then((res) => res.json())
      .then((data) =>
        setAppointments(data.filter((appt) => appt.status !== "cancelled"))
      )
      .catch((err) => console.error(err));

    fetch("http://localhost:3001/reviews")
      .then((res) => res.json())
      .then(setReviews)
      .catch((err) => console.error(err));
  }, []);

  const handleFeedbackClick = (appt) => {
    setSelectedAppointment(appt);
    setFeedback("");
    setRating(0);
  };

  const handleSubmitReview = () => {
    if (!feedback.trim() || rating === 0)
      return alert("Please enter your feedback and rating");

    const newReview = {
      appointmentId: selectedAppointment.id,
      doctorName: selectedAppointment.doctorName,
      speciality: selectedAppointment.speciality,
      feedback,
      rating,
    };

    fetch("http://localhost:3001/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews([...reviews, data]);
        setSelectedAppointment(null);
        alert("Review submitted successfully!");
      })
      .catch((err) => console.error(err));
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  return (
    <div className="review-form-container">
      <h2>Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, index) => (
            <tr key={appt.id}>
              <td>{index + 1}</td>
              <td>{appt.doctorName}</td>
              <td>{appt.speciality}</td>
              <td>
                {(() => {
                  const review = reviews.find(
                    (r) => r.appointmentId === appt.id
                  );
                  return review ? (
                    <span className="feedback-content">
                      <i>
                        {review.feedback} ({review.rating}⭐)
                      </i>
                    </span>
                  ) : (
                    <button
                      className="feedback-btn"
                      onClick={() => handleFeedbackClick(appt)}
                    >
                      Click Here
                    </button>
                  );
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAppointment && (
        <div className="feedback-modal">
          <h3>Provide Feedback for {selectedAppointment.doctorName}</h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
          ></textarea>

          <div className="rating-stars">
            <span>Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? "selected" : ""}`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>

          <div className="button-container">
            <button onClick={handleSubmitReview}>Submit</button>
            <button onClick={() => setSelectedAppointment(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
