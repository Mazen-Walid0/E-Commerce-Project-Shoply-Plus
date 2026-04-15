import "../Register/Register.scss";
import image from "../../assets/shoppingLogin.jpg";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const fakeUser = {
      email: formData.email,
      password: formData.password,
    };

    dispatch(login(fakeUser));

    toast.success("Logged in successfully!");

    setFormData({
      email: "",
      password: "",
    });

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <div className="register">
      <div className="image">
        <img src={image} alt="login-image" />
      </div>

      <div className="info-user">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>

          <div className="input-box password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.password && <span>{errors.password}</span>}
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="login-link">
          Don't have account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
