import "./RandomProduct.scss";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RandomProduct() {
  const [product, setProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const navigate = useNavigate();

  const pad = (n) => String(n).padStart(2, "0");

  const getOrCreateSession = () => {
    const stored = JSON.parse(localStorage.getItem("dailyDeal"));
    const now = Date.now();

    if (!stored || now > stored.expiresAt) {
      const newSession = {
        productId: Math.floor(Math.random() * 194) + 1,
        expiresAt: now + 24 * 60 * 60 * 1000,
      };
      localStorage.setItem("dailyDeal", JSON.stringify(newSession));
      return newSession;
    }

    return stored;
  };

  const fetchProduct = (id) => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data));
  };

  useEffect(() => {
    const session = getOrCreateSession();
    fetchProduct(session.productId);

    const interval = setInterval(() => {
      const remaining = session.expiresAt - Date.now();

      if (remaining <= 0) {
        clearInterval(interval);
        const newSession = getOrCreateSession();
        fetchProduct(newSession.productId);
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const discountedPrice = product
    ? (
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(2)
    : null;

  return (
    <>
      {!product ? (
        <div className="random-product skeleton">
          <div className="info-product">
            <div className="sk-line sk-brand" />
            <div className="sk-line sk-title" />
            <div className="sk-line sk-h3" />
            <div className="sk-line sk-price" />
            <div className="sk-line sk-shop" />
            <div className="time-remaining">
              <div className="sk-line sk-label" />
              <div className="boxes">
                <div className="sk-box" />
                <div className="sk-box" />
                <div className="sk-box" />
              </div>
            </div>
          </div>
          <div className="img-product sk-img" />
        </div>
      ) : (
        <div
          className="random-product"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <div className="info-product">
            <p className="brand">{product.brand}</p>
            <p className="title">{product.title}</p>
            <h3>Up to {Math.round(product.discountPercentage)}% off Voucher</h3>
            <h4>
              <span className="old-price">${product.price}</span>
              <span className="new-price">${discountedPrice}</span>
            </h4>
            <p className="shop-now">
              Shop Now <FaArrowRightLong />
            </p>
            <div className="time-remaining">
              <h5>Time remaining until the offer ends</h5>
              <div className="boxes">
                <div className="time-box">
                  <span className="value">{timeLeft.hours}</span>
                  <span className="label">HRS</span>
                </div>
                <div className="time-box">
                  <span className="value">{timeLeft.minutes}</span>
                  <span className="label">MIN</span>
                </div>
                <div className="time-box">
                  <span className="value">{timeLeft.seconds}</span>
                  <span className="label">SEC</span>
                </div>
              </div>
            </div>
          </div>
          <div className="img-product">
            <img src={product.images[0]} alt={product.title} />
          </div>
        </div>
      )}
    </>
  );
}
