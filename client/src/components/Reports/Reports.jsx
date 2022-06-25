import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getReport } from "../../actions/expense.actions";
import Expense from "../AllExpenses/Expense/Expense";

import styles from "./Reports.module.css";

const Reports = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.expenses.categories);
  const expenses = useSelector((state) => state.expenses.expenses);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  let sum = 0;

  const [formData, setFormData] = useState({
    year: "",
    month: "",
    category: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    getReport(dispatch, {
      month: formData.month,
      year: formData.year,
      category: formData.category,
    });
  }

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={`main-card`}>
      <div className={styles.header}>Reports</div>

      <div className={styles.body}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className="form-group">
              <input
                type="text"
                name="year"
                className="form-control"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <select name="month" onChange={handleChange} value={formData.month}>
                <option value="">Month</option>
                {months.map((month, idx) => (
                  <option key={idx} value={month < 10 ? "0" + month : month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* categories */}
            <div className={`form-group ${styles.categories}`}>
              <select name="category" onChange={handleChange} value={formData.category}>
                <option value="">Choose Category</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className={`btn btn-primary`}>
              Get Report
            </button>
          </div>
        </form>

        <div className={styles["allExpenses-container"]}>
          {expenses.length > 0 ? (
            expenses.map((expense) => {
              sum += expense.price;
              return <Expense key={expense._id} expense={expense} />;
            })
          ) : (
            <>
              <h2>There are no expenses.</h2>
            </>
          )}
        </div>

        <div className={styles.sum}>
          Sum is: <span>{sum}</span> ILS
        </div>
      </div>
    </div>
  );
};

export default Reports;
