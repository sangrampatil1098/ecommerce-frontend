import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./slices/ProductSlice";
import common from "./slices/commonSlice";
import carts from "./slices/cartSlice";
import auth from "./slices/authSlice";
import payment from "./slices/paymentMethodSlice";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : {
      cart: [],
      totalPrice: null,
      cartId: "",
    };

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const selectedUserAddress = localStorage.getItem("CHECKOUT_ADDRESS")
  ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
  : [];

const preloadedState = {
  auth: {
    user: user,
    selectedUserAddress,
  },
  carts: cartItems,
};

const store = configureStore({
  reducer: {
    products,
    common,
    carts,
    auth,
    payment,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disabling the check dramatically improves performance
      // when the state tree is large. It's automatically disabled in production.
      immutableCheck: false,
      // You may also want to disable this if you have complex or large actions:
      serializableCheck: false,
    }),
});

export default store;
