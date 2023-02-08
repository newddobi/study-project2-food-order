import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart";
import uiReducer from "./ui";
import orderReducer from "./order";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    order: orderReducer,
  },
});

export default store;
