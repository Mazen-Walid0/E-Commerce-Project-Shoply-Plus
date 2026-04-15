import "./Register.scss";
import image from "../../assets/shoppingLogin.jpg";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authSlice";
export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // حفظ الحساب في localStorage
    dispatch(login(formData));

    toast.success("Account created successfully!");

    // تفريغ الحقول
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    // تفريغ الأخطاء
    setErrors({
      name: "",
      email: "",
      password: "",
    });

    // تحويل للهوم بعد ثواني بسيطة
    navigate("/");
  };

  return (
    <div className="register">
      <div className="image">
        <img src={image} alt="image-register" />
      </div>

      <div className="info-user">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>

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

          <button type="submit">Register</button>
        </form>

        <p className="login-link">
          Already have account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}
