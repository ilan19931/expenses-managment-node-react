import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      const { payload } = action;

      return {
        alerts: [...state.alerts, payload],
      };
    },
    removeAlert: (state, action) => {
      const { payload } = action;

      return {
        alerts: [...state.alerts.filter((alert) => alert.id !== payload)],
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
