import { useDispatch, useSelector } from "react-redux";
import "./CartItems.scss";
import BrowseCategory from "../../components/BrowseCategory/BrowseCategory";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Redux/cartSlice";
import toast from "react-hot-toast";

export default function CartItems() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.error("Product removed from cart");
  };

  const grandTotal = items
    .reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discountPercentage / 100);

      return total + discountedPrice * item.quantity;
    }, 0)
    .toFixed(2);
  return (
    <div className="cart-items">
      <div className="container">
        {items.map((item) => {
          const discountedPrice = (
            item.price *
            (1 - item.discountPercentage / 100)
          ).toFixed(2);

          const total = (discountedPrice * item.quantity).toFixed(2);
          return (
            <div className="item" key={item.id}>
              <div className="image">
                <span>-{Math.round(item.discountPercentage)}%</span>
                <img src={item.thumbnail} alt={item.title} />
              </div>

              <div className="info-item">
                <h4 className="title-item">{item.title}</h4>

                <p className="price">
                  Price: <span className="new">${discountedPrice}</span>
                  <span className="old">${item.price}</span>
                </p>

                <div className="quantity-box">
                  <button
                    className="decreaseQuantity"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>

                  <span className="quantity">{item.quantity}</span>

                  <button
                    className="increaseQuantity"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>

                <p className="total">
                  Total: <span>${total}</span>
                </p>

                <button
                  className="remove"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        <div className={`cart-total ${items.length === 0 ? "empty" : ""}`}>
          {items.length > 0 ? (
            <h3>
              Grand Total: <span>${grandTotal}</span>
            </h3>
          ) : (
            <div className="empty-state">
              <h2>No products in cart</h2>
              <p>Add some products to see them here</p>
            </div>
          )}
        </div>
      </div>
      <BrowseCategory />
    </div>
  );
}
