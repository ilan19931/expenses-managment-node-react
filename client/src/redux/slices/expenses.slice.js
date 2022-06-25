import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  categories: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    loadExpenses: (state, action) => {
      const { payload } = action;

      return {
        ...state,
        expenses: [...payload],
      };
    },
    loadCategories: (state, action) => {
      const { payload } = action;

      return {
        ...state,
        categories: [...payload],
      };
    },
    addExpense: (state, action) => {
      const { payload } = action;

      return {
        ...state,
        expenses: [payload, ...state.expenses],
      };
    },
    addCategory: (state, action) => {
      const { payload } = action;

      return {
        ...state,
        categories: [payload, ...state.categories],
      };
    },
    removeCategory: (state, action) => {
      const { payload } = action;

      return {
        ...state,
        categories: [...state.categories.filter((category) => category._id !== payload)],
      };
    },
    removeExpense: (state, action) => {
      const { payload } = action;

      return {
        ...state,
        expenses: [...state.expenses.filter((expense) => expense._id !== payload)],
      };
    },
  },
});

export const expenseActions = expensesSlice.actions;

export default expensesSlice.reducer;
