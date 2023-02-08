import { createSlice } from "@reduxjs/toolkit";

const initialOrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders = state.orders.concat(action.payload);
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
