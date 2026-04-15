import "./Footer.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
  const user = useSelector((state) => state.auth.user);
  const isLogin = !!user;
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="col brand-col">
          <h2>MA-Shop</h2>
          <p className="subscribe-title">Subscribe</p>
          <p className="subscribe-desc">Get off your first order</p>
        </div>

        <div className="col">
          <h4>Support</h4>
          <p>moshop@gmail.com</p>
          <p>+20 155 691 5374</p>
        </div>

        <div className="col">
          <h4>Account</h4>
          {isLogin ? (
            <Link to="/profile">My Account</Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          <Link to="/cart-items">Cart</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/shop">Shop</Link>
        </div>

        <div className="col">
          <h4>Quick Link</h4>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Copyright Moamen 2023. All right reserved</p>
      </div>
    </footer>
  );
}
