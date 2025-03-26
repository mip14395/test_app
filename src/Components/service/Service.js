import { Link } from "react-router-dom";
import "./Service.css";
import instantConsultation from "../../asset/image/instant_consultation.jpg";
import bookAppointment from "../../asset/image/book_appointment.jpg";
import selfCheckup from "../../asset/image/self_check.jpg";
import healthTips from "../../asset/image/tips.jpg";

const Service = () => {
  const services = [
    {
      title: "Instant Consultation",
      img: instantConsultation,
      link: "/instant-consultation",
    },
    {
      title: "Book an Appointment",
      img: bookAppointment,
      link: "/appointment",
    },
    { title: "Self Checkup", img: selfCheckup, link: "/self-checkup" },
    {
      title: "Health Tips and Guidance",
      img: healthTips,
      link: "/health-tips",
    },
  ];
  return (
    <section className="service-section">
      <h2>Best Services</h2>
      <p>Take care of your body. It’s the only place you have to live.</p>
      <div className="service-container">
        {services.map((service, index) => (
          <Link to={service.link} key={index} className="service-card">
            <img src={service.img} alt={service.title} />
            <div className="card-body">
              <h5>{service.title}</h5>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Service;
