import React from "react";

import { removeExpense } from "../../../actions/expense.actions";
import moment from "moment";

import carImage from "../../../images/car.png";
import homeImage from "../../../images/home.png";
import petImage from "../../../images/pet.png";
import etcImage from "../../../images/etc.png";
import styles from "./expense.module.css";
import { useDispatch } from "react-redux";

const images = {
  pet: petImage,
  home: homeImage,
  car: carImage,
  etc: etcImage,
};

const Expense = ({ expense }) => {
  const { title, price, category, description, dateCreated, _id } = expense;
  const dispatch = useDispatch();

  const handleRemove = () => {
    removeExpense(dispatch, _id);
  };

  return (
    <div className={styles.expense}>
      <div className={styles.icon}>
        <img src={images[category.toLowerCase()]} alt={`${category} icon`} />
      </div>

      <div className={styles.title}>{title}</div>

      <p className="description">{description}</p>

      {/*  moment(createdAt).format("YYYY-DD-mm") */}
      <p className="date">{dateCreated}</p>

      <div className={styles.price}>{price} ILS</div>

      <div className={styles.actions}>
        <button className="btn btn-danger bi bi-trash" onClick={handleRemove}></button>
      </div>
    </div>
  );
};

export default Expense;
