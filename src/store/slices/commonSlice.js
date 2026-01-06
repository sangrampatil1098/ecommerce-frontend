import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMessage: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {setLoader, setErrorMessage} = commonSlice.actions;
export default commonSlice.reducer;
