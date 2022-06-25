import axios from "axios";
import { expenseActions } from "../redux/slices/expenses.slice";

import { setAlert } from "./ui.actions";

export const addExpense = async (dispatch, expense) => {
  try {
    const res = await axios.post("expenses/add", expense);

    dispatch(expenseActions.addExpense(res.data));
  } catch (err) {
    const errors = err.response.data?.errors;

    if (errors) {
      console.log(...errors);

      errors.forEach((err) =>
        setAlert(dispatch, {
          type: "error",
          msg: err.msg,
        })
      );
    }
  }
};

export const getAllExpenses = async (dispatch) => {
  try {
    const res = await axios.get("expenses/");

    dispatch(expenseActions.loadExpenses(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getAllCategories = async (dispatch) => {
  try {
    const res = await axios.get("categories/");

    dispatch(expenseActions.loadCategories(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const removeExpense = async (dispatch, expenseId) => {
  try {
    await axios.delete("expenses/" + expenseId);

    dispatch(expenseActions.removeExpense(expenseId));
    setAlert(dispatch, { type: "success", msg: "Expense removed!" });
  } catch (err) {
    console.log(err);
  }
};

export const getReport = async (dispatch, reportData) => {
  try {
    const res = await axios.get(
      `expenses/report/?month=${reportData.month}&year=${reportData.year}&category=${reportData.category}`
    ); //?month=${reportData.month}&year=${reportData.year}&category=${reportData.category}

    dispatch(expenseActions.loadExpenses(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(...errors);
    localStorage.removeItem("token");

    errors.forEach((err) =>
      setAlert(dispatch, {
        type: "error",
        msg: err.msg,
      })
    );
  }
};
