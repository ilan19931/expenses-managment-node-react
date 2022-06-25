import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Layout/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import styles from "./app.module.css";
import setAuthToken from "./utils/setAuthToken";
import { auth } from "./actions/auth.actions";
import Alerts from "./components/Alerts/Alerts";
import Reports from "./components/Reports/Reports";
import PrivateRoute from "./utils/PrivateRoute";
import { useEffect } from "react";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.ui.alerts);
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);

      auth(dispatch);
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className={styles["app-container"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private */}
            <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <Reports />
                </PrivateRoute>
              }
            />

            {/* Bad Routes */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>

      {/* ALERTS SECTION */}
      {alerts.length !== 0 && <Alerts alerts={alerts} />}
    </div>
  );
};

export default App;
