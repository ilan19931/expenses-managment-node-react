import React from "react";

import AddExpense from "../AddExpense/AddExpense";
import AllExpenses from "../AllExpenses/AllExpenses";
import { useSelector } from "react-redux";

import styles from "./home.module.css";

const Home = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className={styles.home}>
      {auth.isAuthenticated ? (
        <>
          <AddExpense />
          <AllExpenses />
        </>
      ) : (
        <>
          <div className="main-card">
            <h1 className="text-center">
              <p>
                Expense Management by Ilan and Ido. Please login or create
                account to start managing your expenses.
              </p>
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
