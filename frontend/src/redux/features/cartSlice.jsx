import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
  favoriteItems: JSON.parse(localStorage.getItem("favoriteItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.product === action.payload.product
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
        existingItem.price = existingItem.price * existingItem.quantity;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    RemoveCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
    clearCartItem: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setFavorite: (state, action) => {
      const existingItem = state.favoriteItems.find(
        (item) => item.product === action.payload.product
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
        existingItem.price = existingItem.price * existingItem.quantity;
      } else {
        state.favoriteItems.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      localStorage.setItem(
        "favoriteItems",
        JSON.stringify(state.favoriteItems)
      );
    },
    removeFavorite: (state, action) => {
      state.favoriteItems = state.favoriteItems.filter((item) => {
        return item.product !== action.payload;
      });

      localStorage.setItem(
        "favoriteItems",
        JSON.stringify(state.favoriteItems)
      );
    },
  },
});

export const {
  addToCart,
  RemoveCartItem,
  saveShippingInfo,
  clearCartItem,
  setFavorite,
  removeFavorite,
} = cartSlice.actions;
export default cartSlice.reducer;
