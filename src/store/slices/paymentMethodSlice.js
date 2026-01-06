import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/api";
import { setLoader } from "./commonSlice";
import { saveCart } from "./cartSlice";

const initialState = {
  paymentMethod: "Stripe",
};

export const createUserCart = createAsyncThunk(
  "createUserCart",
  async (payload, thunkAPI) => {
    try {

      const { sendCartItems } = payload;

      const response = await axiosInstance.post(
        "/api/carts/create",
        sendCartItems
      );

      thunkAPI.dispatch(fetchFromCart());
    } catch (err) {
      console.log("err", err);
    }
  }
);

export const fetchFromCart = createAsyncThunk(
  "fetchFromCart",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoader(true));

      const { data } = await axiosInstance.get("/api/carts/user/cart");

      thunkAPI.dispatch(
        saveCart({
          cart: data.productDTOS,
          totalPrice: data.totalPrice,
          cartId: data.cartId,
        })
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(thunkAPI.getState().carts)
      );

      thunkAPI.dispatch(setLoader(false));
    } catch (err) {
      console.log("error", err);
    }
  }
);

const paymentMethodSlice = createSlice({
  name: "paymentMethodSlice",
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const { setPaymentMethod } = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
