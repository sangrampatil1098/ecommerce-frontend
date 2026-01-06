import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/api";
import toast from "react-hot-toast";
import { setLoader } from "./commonSlice";
import { clearCart } from "./cartSlice";

const initialState = {
  user: null,
  address: [],
  clientSecret: null,
  selectedUserAddress: null,
};

export const authenticateSignInuser = createAsyncThunk(
  "authenticateSignInUser",
  async (data, thunkAPI) => {
    const { payload, setLoader, navigate, reset } = data;
    setLoader(true);
    try {
      const { data } = await axiosInstance.post("/api/auth/sign-in", payload);
      localStorage.setItem("auth", JSON.stringify(data));
      thunkAPI.dispatch(login(data));
      toast.success("User logged in successfully");
      reset();
      navigate("/");
    } catch (err) {
      console.log(err?.response?.data?.message || "Login failed");
      toast.error(err.response.data.message);
    } finally {
      setLoader(false);
    }
  }
);

export const regiterNewUser = createAsyncThunk(
  "registerNewUser",
  async (data) => {
    const { payload, setLoader, navigate, reset } = data;
    setLoader(true);
    try {
      const { data } = await axiosInstance.post("/api/auth/sign-up", payload);
      toast.success(data?.message || "User registered successfully");
      reset();
      navigate("/login");
    } catch (err) {
      console.log(err?.response?.data?.message || "Registration failed");
      toast.error(err.response.data.message);
    } finally {
      setLoader(false);
    }
  }
);

export const logOutUser = createAsyncThunk("logout", (payload, thunkAPI) => {
  const { navigate } = payload;
  thunkAPI.dispatch(logout());
  localStorage.removeItem("auth");
  navigate("/login");
});

export const createStripeSecretKey = createAsyncThunk(
  "createStripeSecretKey",
  async (data, thunkAPI) => {
    const { payload } = data;
    thunkAPI.dispatch(setLoader(true));
    try {
      const { data } = await axiosInstance.post(
        "/api/orders/stripe-client-secret",
        payload 
      );
      thunkAPI.dispatch(setClientSecret(data));
      localStorage.setItem("client-secret", JSON.stringify(data));
    } catch (err) {
      console.log(
        err?.response?.data?.message || "Failed to create secret key"
      );
      toast.error(err.response.data.message);
    } finally {
      thunkAPI.dispatch(setLoader(false));
    }
  }
);

export const placeOrder = createAsyncThunk(
  "placeOrder",
  async (data, thunkAPI) => {
    const { payload } = data;
    try {
      const { data } = await axiosInstance.post(
        "/api/orders/users/payment/online",
        payload
      );
      thunkAPI.dispatch(clearClientSecret());
      localStorage.removeItem("client-secret");
      thunkAPI.dispatch(clearCart());
      localStorage.removeItem("cartItems");
      localStorage.removeItem("CHECKOUT_ADDRESS");

      toast.success("Order accepted");
    } catch (err) {
      console.log(err?.response?.data?.message || "Payment Failed");
      toast.error(err.response.data.message);
    }
  }
);

const authAlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    saveAddress: (state, action) => {
      state.address = action.payload;
    },
    selectCheckoutAddress: (state, action) => {
      state.selectedUserAddress = action.payload;
    },
    clearCheckoutAddress: (state) => {
      state.selectedUserAddress = null;
    },
    logout: (state) => {
      state.user = null;
      state.address = [];
    },
    setClientSecret: (state, action) => {
      state.clientSecret = action.payload;
    },
    clearClientSecret: (state) => {
      state.clientSecret = null;
      state.selectedUserAddress = null;
    },
  },
});

export const {
  login,
  logout,
  saveAddress,
  selectCheckoutAddress,
  clearCheckoutAddress,
  setClientSecret,
  clearClientSecret,
} = authAlice.actions;

export default authAlice.reducer;
