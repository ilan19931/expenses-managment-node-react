import { createSlice } from "@reduxjs/toolkit";

const initState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      const { payload } = action;
      const { token, user } = payload;
      return {
        ...state,
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
      };
    },
    register: (state, action) => {
      const { payload } = action;
      const { token, user } = payload;
      return {
        ...state,
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
      };
    },
    logout: (state) => {
      return {
        ...initState,
        isLoading: false,
      };
    },
    error: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        errors: payload,
        isAuthenticated: false,
        isLoading: false,
      };
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
