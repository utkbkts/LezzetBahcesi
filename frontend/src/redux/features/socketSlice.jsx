import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  newOrder: [],
  message: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      const updatedOrder = action.payload;
      const existingOrderIndex = state.orders.findIndex(
        (order) => order._id === updatedOrder._id
      );

      if (existingOrderIndex > -1) {
        state.orders[existingOrderIndex] = updatedOrder;
      } else {
        state.orders.push(updatedOrder);
      }
    },

    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setNewOrder: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  setOrders,
  setMessage,
  setAdminOrders,
  setAdminMessage,
  setNewOrder,
} = socketSlice.actions;
export default socketSlice.reducer;
