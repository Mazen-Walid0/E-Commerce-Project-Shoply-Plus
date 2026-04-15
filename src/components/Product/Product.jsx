import { useNavigate, useParams } from "react-router-dom";
import "./Product.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Redux/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../Redux/favoritesSlice";
export default function Product() {
  const navigation = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isLogin = !!user;
  const dispatch = useDispatch();
  const favoritesItems = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);
  const { IdProduct } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const cartItem = cartItems.find((item) => item.id === product?.id);
  const isInFavorites = favoritesItems.some((item) => item.id === product?.id);
  const currentQuantity = cartItem ? cartItem.quantity : 1;

  useEffect(() => {
    setProduct(null);
    axios.get(`https://dummyjson.com/products/${IdProduct}`).then((res) => {
      setProduct(res.data);
      setActiveImg(0);
    });
  }, [IdProduct]);

  const handleWishlist = () => {
    if (!isLogin) {
      setModalMessage(
        "Please login or register to add items to your favourites.",
      );
      setShowModal(true);
      return;
    }

    const isInFavorites = favoritesItems.some((item) => item.id === product.id);

    if (!isInFavorites) {
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
    } else {
      dispatch(removeFromFavorites(product.id));

      toast.error("Removed from favorites 💔");
    }
  };

  const handleQuantity = (type) => {
    if (!isLogin) {
      setModalMessage(
        "Please login or register to continue with your purchase.",
      );
      setShowModal(true);
      return;
    }
    if (type === "inc") dispatch(increaseQuantity(product.id));
    if (type === "dec") dispatch(decreaseQuantity(product.id));
  };

  const handleBuyNow = () => {
    if (!isLogin) {
      setModalMessage(
        "Please login or register to continue with your purchase.",
      );
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
    navigation("/cart-items");
  };

  if (!product) {
    return (
      <div className="product skeleton">
        <div className="images">
          <div className="main-img sk-box" />
          <div className="thumbnails">
            <div className="sk-thumb" />
            <div className="sk-thumb" />
            <div className="sk-thumb" />
          </div>
        </div>
        <div className="info-product">
          <div className="sk-line sk-title" />
          <div className="sk-line sk-price" />
          <div className="sk-line sk-qty" />
          <div className="sk-line sk-btn" />
          <div className="sk-line sk-desc" />
          <div className="sk-line sk-desc" />
        </div>
      </div>
    );
  }

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <>
      <div className="product">
        <div className="images">
          <div className="main-img">
            <img src={product.images[activeImg]} alt={product.title} />
          </div>
          <div className="thumbnails">
            {product.images.map((img, ind) => (
              <img
                key={ind}
                src={img}
                alt=""
                className={activeImg === ind ? "active" : ""}
                onClick={() => setActiveImg(ind)}
              />
            ))}
          </div>
        </div>

        <div className="info-product">
          <h2 className="title">{product.title}</h2>

          <div className="prices">
            <span className="old-price">${product.price}</span>
            <span className="new-price">${discountedPrice}</span>
          </div>

          <p className="total">
            Total: ${(discountedPrice * currentQuantity).toFixed(2)}
          </p>

          <div className="quantity">
            <button onClick={() => handleQuantity("dec")}>-</button>
            <span>{currentQuantity}</span>
            <button onClick={() => handleQuantity("inc")}>+</button>
          </div>

          <div className="actions">
            <button className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button
              className={`wishlist ${isInFavorites ? "active" : ""}`}
              onClick={handleWishlist}
            >
              <FaRegHeart />
            </button>
          </div>

          <div className="description">
            <p className="desc-title">Description:</p>
            <p className="desc-text">{product.description}</p>
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
