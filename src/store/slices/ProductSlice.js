import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  pagination: {},
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      const {
        products,
        pageNumber,
        pageSize,
        totalElements,
        totalPages,
        lastPage,
      } = action.payload;
      state.products = products;
      state.pagination = {
        pageNumber,
        pageSize,
        totalElements,
        totalPages,
        lastPage,
      };
    },
    setCategories : (state,action)=>{
      const {categories} = action.payload;
      state.categories = categories;
    }
  },
});

export const { setProducts,setCategories } = productSlice.actions;

export default productSlice.reducer;
