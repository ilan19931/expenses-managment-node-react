import React from "react";
import { useState } from "react";
import { addExpense, getAllCategories } from "../../actions/expense.actions";
import { useDispatch, useSelector } from "react-redux";

import styles from "./addExpense.module.css";

const AddExpense = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.expenses.categories);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
  });

  const [isVisible, setIsVisible] = useState(true);

  dispatch(getAllCategories);

  const handleSubmit = (event) => {
    event.preventDefault();

    addExpense(dispatch, formData);

    // reset fields.
    setFormData({
      title: "",
      price: "",
      category: "",
      description: "",
    });
  };

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleShowHide = (event) => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <div className={`${styles.addExpense} main-card`}>
      <div className={styles["addExpense-container"]}>
        <div className={styles.header}>
          <div className={styles.showHide} onClick={handleShowHide}>
            {isVisible ? "Hide" : "Show"}
          </div>
          <h2 className="text-center">Add New Expense</h2>
        </div>

        {isVisible && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={formData.title}
                className="form-control"
                placeholder="Title"
              />
            </div>

            <div className={styles.twoCols}>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                value={formData.price}
                className="form-control"
                placeholder="Price"
              />

              <select name="category" onChange={handleChange} value={formData.category}>
                <option value="">Choose Category</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <textarea
                name="description"
                className="form-controller fullSize p-2"
                rows="5"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="btn btn-primary mt-2 fullSize">Add Expense</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddExpense;
