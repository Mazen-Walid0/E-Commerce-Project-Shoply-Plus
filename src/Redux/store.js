import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartItems from "./cartSlice";
import favoritesItems from "./favoritesSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartItems,
    favorites: favoritesItems,
    auth: authReducer,
  },
});
