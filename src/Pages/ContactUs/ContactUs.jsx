import "./ContactUs.scss";
import { IoCall } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";

import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
export default function ContactUs() {
  const user = useSelector((state) => state.auth.user);
  const isLogin = !!user;
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    const { name, email, phone, message } = formData;

    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    if (!message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isLogin) {
      setShowModal(true);
      return;
    }

    toast.success("Your message has been sent successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setErrors({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="info-web">
          <div className="call">
            <div className="title-row">
              <div className="icon-call">
                <IoCall />
              </div>
              <p>Call To Us</p>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>
              Phone: <span>+20 127 090 2257</span>
            </p>
          </div>

          <hr />

          <div className="mess">
            <div className="title-row">
              <div className="icon-mess">
                <MdOutlineMailOutline />
              </div>
              <p>Write To Us</p>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>
              Email: <span>mazenwalid385@gmail.com</span>
            </p>
          </div>
        </div>

        <div className="form">
          <div className="inputs-row">
            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="input-box">
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>

          <div className="input-box">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>

          <button className="send-btn" onClick={handleSubmit}>
            Send Message
          </button>
        </div>
      </div>

      {showModal && (
        <Modal
          title="You need to login first"
          message="Please login or register to send a message."
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
