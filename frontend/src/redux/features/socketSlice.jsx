import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  adminOrders: [],
  adminMessage: null,
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
    setAdminOrders: (state, action) => {
      const updatedOrder = action.payload;
      const existingOrderIndex = state.adminOrders.findIndex(
        (order) => order._id === updatedOrder._id
      );

      if (existingOrderIndex > -1) {
        state.adminOrders[existingOrderIndex] = updatedOrder;
      } else {
        state.adminOrders.push(updatedOrder);
      }
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setAdminMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setOrders, setMessage, setAdminOrders, setAdminMessage } =
  socketSlice.actions;
export default socketSlice.reducer;
