import "./ProductCard.scss";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cartSlice";
import toast from "react-hot-toast";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../Redux/favoritesSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

export default function ProductCard({ product }) {
  const user = useSelector((state) => state.auth.user);
  const isLogin = !!user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = cartItems.some((item) => item.id === product.id);

  const favoritesItems = useSelector((state) => state.favorites.items);
  const isInFavorites = favoritesItems.some((item) => item.id === product.id);

  if (!product) return null;
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const handleAddToCart = () => {
    if (!isLogin) {
      setModalMessage("Please login or register to add items to your cart.");
      setShowModal(true);
      return;
    }
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        discountPercentage: product.discountPercentage,
        quantity: 1,
      }),
    );
    toast.success("Item added to Cart");
  };

  const handleFavorite = () => {
    if (!isLogin) {
      setModalMessage(
        "Please login or register to add items to your favourites.",
      );
      setShowModal(true);
      return;
    }

    if (isInFavorites) {
      dispatch(removeFromFavorites(product.id));
      toast.error("Removed from favorites 💔");
    } else {
      dispatch(
        addToFavorites({
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          price: product.price,
          discountPercentage: product.discountPercentage,
        }),
      );
      toast.success("Added to favorites ❤️");
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="img-wrapper">
          <div className="discount-fav">
            <span className="discount">
              -{Math.round(product.discountPercentage)}%
            </span>
            <FaHeart
              className={`fav-icon ${isInFavorites ? "active" : ""}`}
              onClick={handleFavorite}
            />
          </div>
          <div
            className="img-card"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div
            className={`add-to-cart ${isInCart ? "in-cart" : ""}`}
            onClick={!isInCart ? handleAddToCart : undefined}
          >
            {isInCart ? "Item Is In Cart" : "Add to Cart"}
          </div>
        </div>
        <div className="price-title">
          <h3 className="title-card">{product.title}</h3>
          <div className="old-new-price">
            <span className="new-price">${discountedPrice}</span>
            <span className="old-price">${product.price}</span>
          </div>
        </div>
      </div>

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
