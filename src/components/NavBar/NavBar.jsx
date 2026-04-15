import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/authSlice";
import "./NavBar.scss";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { clearCart } from "../../Redux/cartSlice";
import { clearFavorites } from "../../Redux/favoritesSlice";

export default function NavBar() {
  const cartItems = useSelector((state) => state.cart.items);
  const favoritesItems = useSelector((state) => state.favorites.items);
  const user = useSelector((state) => state.auth.user);
  const isLogin = !!user;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleCartClick = () => {
    setModalMessage(
      "You have no products in your cart because you don't have an account. Please login first.",
    );
    setShowModal(true);
  };

  const handleFavClick = () => {
    setModalMessage("Please login or register to add items to your favorites.");
    setShowModal(true);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      setNoResults(false);
      return;
    }
    const timeout = setTimeout(() => {
      axios
        .get(`https://dummyjson.com/products/search?q=${search}&limit=5`)
        .then((res) => {
          setResults(res.data.products);
          setNoResults(res.data.products.length === 0);
        });
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSearch = () => {
    if (search.trim() === "") return;
    setResults([]);
    setNoResults(false);
    setSearch("");
    navigate(`/search?q=${search}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  const handleClearStorge = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearFavorites());
  };

  return (
    <>
      <nav className="nav-container">
        <div className="container">
          <Link to="/" className="logo text-2xl font-medium">
            MA-Shop
          </Link>
          <div className="menu">
            <FaBarsStaggered
              className="block cursor-pointer md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            <div className={`links ${menuOpen ? "active" : ""}`}>
              <NavLink className={pathname == "/" ? "active" : ""} to="/">
                Home
              </NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/about">About</NavLink>
              {!isLogin && <NavLink to="/register">Sign Up</NavLink>}
            </div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              value={search}
            />
            <div className="search-icon" onClick={handleSearch}>
              <IoMdSearch />
            </div>

            {results.length > 0 && (
              <div className="search-results">
                {results.map((product) => (
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    className="result-item"
                    onClick={() => {
                      setResults([]);
                      setSearch("");
                    }}
                  >
                    <img src={product.thumbnail} alt={product.title} />
                    <div>
                      <p className="result-title">{product.title}</p>
                      <p className="result-price">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {noResults && (
              <div className="search-results">
                <p className="no-results">No products found for "{search}"</p>
              </div>
            )}
          </div>

          <div className="icons">
            {isLogin ? (
              <Link to="/favorites" className="fav-icon">
                <FaRegHeart />
                <span className="length">{favoritesItems.length}</span>
              </Link>
            ) : (
              <button className="fav-icon" onClick={handleFavClick}>
                <FaRegHeart />
              </button>
            )}

            {isLogin ? (
              <Link to="/cart-items" className="cart-icon">
                <IoCartOutline />
                <span className="length">{cartItems.length}</span>
              </Link>
            ) : (
              <button className="cart-icon" onClick={handleCartClick}>
                <IoCartOutline />
              </button>
            )}
            {isLogin ? (
              <button className="auth-btn logout" onClick={handleClearStorge}>
                <span>Logout</span>
                <FaSignOutAlt />
              </button>
            ) : (
              <Link to="/login" className="auth-btn login">
                <span>Login</span>
                <FaSignInAlt />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {showModal && (
        <Modal
          title="You need to login first"
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
