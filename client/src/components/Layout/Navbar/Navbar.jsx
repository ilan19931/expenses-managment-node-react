import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./navbar.module.css";
import { logout } from "../../../actions/auth.actions";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <div className={styles.leftSide}>
        <h2>
          <Link to="/">Expense Management</Link>
        </h2>
      </div>

      <div className={styles.rightSide}>
        {auth.isAuthenticated ? (
          <>
            <h3>
              Welcome, <span style={{ color: "white" }}>{auth.user.email}</span>
            </h3>

            <button className="btn btn-success" onClick={() => navigate("/reports")}>
              Reports
            </button>

            <button className="btn btn-danger" onClick={() => logout(dispatch)}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles["nav-item"]}>
              Login
            </Link>
            <Link to="/register" className={styles["nav-item"]}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
