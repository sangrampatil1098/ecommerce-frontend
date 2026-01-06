import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: [],
  totalPrice: null,
  cartId: "",
};

export const addToCart = createAsyncThunk(
  "addtoCart",
  async (payload, thunkAPI) => {
    const { data, qty } = payload;

    const { products } = thunkAPI.getState().products;

    const product = products.find((item) => item.productId === data.productId);

    const isQuantityExist = product.quantity >= qty;

    if (isQuantityExist) {
      thunkAPI.dispatch(setCartItems({ ...data, quantity: qty }));
      toast.success(`${data.productName} is successfully added to the cart`);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(thunkAPI.getState().carts)
      );
    } else {
      toast.error("Out of stock");
      //error
    }
  }
);

export const increaseCartQuantity = createAsyncThunk(
  "increaseCartQuantity",
  async (payload, thunkAPI) => {
    const { cartItems: data, currentQuantity, setCurrentQuantity } = payload;

    const { products } = thunkAPI.getState().products;
    console.log("thunkAPI.getState().carts", thunkAPI.getState().products);

    const product = products.find((item) => item.productId === data.productId);
    console.log("thunkAPI.getState().carts", thunkAPI.getState().carts);

    const isQuantityExist = product.quantity >= currentQuantity + 1;
    console.log("thunkAPI.getState().carts", thunkAPI.getState().carts);

    if (isQuantityExist) {
      const newQuantity = currentQuantity + 1;
      setCurrentQuantity(newQuantity);

      thunkAPI.dispatch(setCartItems({ ...data, quantity: newQuantity }));

      localStorage.setItem(
        "cartItems",
        JSON.stringify(thunkAPI.getState().carts)
      );
    } else {
      toast.error("Quantity reached to limit");
      //error
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "decreaseQuantity",
  async (payload, thunkAPI) => {
    const { cartItems: data, currentQuantity } = payload;

    thunkAPI.dispatch(setCartItems({ ...data, quantity: currentQuantity }));

    localStorage.setItem(
      "cartItems",
      JSON.stringify(thunkAPI.getState().carts)
    );
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      console.log("state", state);
      const product = action.payload;
      const existingProduct = state.cart.find(
        (item) => item.productId === product.productId
      );
      if (existingProduct) {
        const updatedProduct = state.cart.map((item) => {
          if (item.productId === product.productId) {
            return product;
          } else {
            return item;
          }
        });
        state.cart = updatedProduct;
        state.totalPrice = null;
        state.cartId = "";
      } else {
        const newCart = [...state.cart, product];
        state.cart = newCart;
        state.totalPrice = null;
        state.cartId = "";
      }
    },
    removeCartItems: (state, action) => {
      const filteredCartItems = state.cart.filter(
        (item) => item.productId !== action.payload.productId
      );
      state.cart = filteredCartItems;
      state.cartId = "";
      state.totalPrice = null;
      localStorage.setItem("cartItems", JSON.stringify(state));
      toast.success(action.payload.productName + " removed successfully");
    },

    saveCart: (state, action) => {
      state.cart = action.payload.cart;
      state.totalPrice = action.payload.totalPrice;
      state.cartId = action.payload.cartId;
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalPrice = null;
      state.cartId = "";
    },
  },
});

export const { setCartItems, removeCartItems, saveCart,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
