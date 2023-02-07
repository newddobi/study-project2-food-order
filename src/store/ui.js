import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  items: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
