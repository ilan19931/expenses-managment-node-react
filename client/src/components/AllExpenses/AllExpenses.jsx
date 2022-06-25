import Expense from "./Expense/Expense.jsx";
import styles from "./allExpenses.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../../actions/expense.actions.js";

const AllExpenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    getAllExpenses(dispatch);
  }, [dispatch]);

  return (
    <div className="main-card">
      <div className={styles.allExpenses}>
        <div className={styles.mainText}>All Expenses</div>

        <div className={styles["allExpenses-container"]}>
          {expenses.length > 0 ? (
            expenses.map((expense) => <Expense key={expense._id} expense={expense} />)
          ) : (
            <>
              <h2>There are no expenses.</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllExpenses;
