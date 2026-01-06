import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/api";
import toast from "react-hot-toast";
import { setLoader } from "./commonSlice";
import {
  clearCheckoutAddress,
  saveAddress,
  selectCheckoutAddress,
} from "./authSlice";

export const addUpdateUserAddress = createAsyncThunk(
  "addUpdateUserAddress",
  async (data, thunkAPI) => {
    const { payload, setOpenAddressModal, addressId } = data;
    thunkAPI.dispatch(setLoader(true));
    try {
      if (addressId) {
        const reeponse = await axiosInstance.put(
          `/api/addresses/${addressId}`,
          payload
        );
      } else {
        const res = await axiosInstance.post("/api/addresses", payload);
      }
      toast.success("Address saved successfully");
      thunkAPI.dispatch(fetchUserAddresses());
    } catch (err) {
      console.log(err?.response?.data?.message || "Internal Server Error");
      toast.error(err.response.data.message);
    } finally {
      thunkAPI.dispatch(setLoader(false));
      setOpenAddressModal(false);
    }
  }
);

export const fetchUserAddresses = createAsyncThunk(
  "fetchUserAddresses",
  async (data, thunkAPI) => {
    thunkAPI.dispatch(setLoader(true));
    try {
      const { data } = await axiosInstance.get("/api/addresses");
      thunkAPI.dispatch(saveAddress(data));
    } catch (err) {
      console.log(err?.response?.data?.message || "Internal Server Error");
      toast.error(err.response.data.message);
    } finally {
      thunkAPI.dispatch(setLoader(false));
    }
  }
);

export const selectAddress = createAsyncThunk(
  "selectedUserAddress",
  (payload, thunkAPI) => {
    const { address } = payload;
    thunkAPI.dispatch(selectCheckoutAddress(address));
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
  }
);

export const deleteUserAddress = createAsyncThunk(
  "deleteUserAddress",
  async (data, thunkAPI) => {
    const { addressId, setOpenDeleteModal } = data;
    thunkAPI.dispatch(setLoader(true));
    try {
      await axiosInstance.delete(`/api/addresses/${addressId}`);
      toast.success("Address deleted successfully");
      thunkAPI.dispatch(fetchUserAddresses());
      thunkAPI.dispatch(clearCheckoutAddress());
    } catch (err) {
      console.log(err?.response?.data?.message || "Internal Server Error");
      toast.error(err.response.data.message);
    } finally {
      thunkAPI.dispatch(setLoader(false));
      setOpenDeleteModal(false);
    }
  }
);
