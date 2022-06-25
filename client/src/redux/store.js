import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice";
import uiReducer from "./slices/ui.slice";
import expensesReducer from "./slices/expenses.slice";

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    expenses: expensesReducer,
  },
});
